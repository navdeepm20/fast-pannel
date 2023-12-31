import { h } from "preact";
import { useRef, useState } from "preact/hooks";
import { forwardRef } from "preact/compat";

//mui
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import DateTimePicker from "../../components/utility/DateTimePicker";
import DatePicker from "../../components/utility/DatePicker";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
//libs
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import { notificationHandler } from "../../utils/utility";

export const createCols = (row, fieldConfig) => {
  if (row) {
    return Object.keys(row).map((col, ind) => {
      if (fieldConfig[row]) {
        return {
          field: col,
          headerName: col,
          ...fieldConfig[row],
        };
      } else {
        return {
          field: col,
          headerName: col,
          // type: getFieldType(col, row),
        };
      }
    });
  }
  return [];
};

const CustomTextField = forwardRef((props) => {
  const getPropsValue = (value) => {
    if (value || value === 0) {
      return props?.value;
    }
    return null;
  };
  const [value, setValue] = useState(props?.value || null);
  return (
    <TextField
      {...props}
      inputProps={{
        ref: props?.compRef,
        // style: { maxHeight: "1rem" },
      }}
      placeholder={props?.name}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        sx: {
          p: 1,
        },
      }}
      // label={props?.name}
      multiline
      required={props?.required}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
});

const CustomConnectedWith = ({
  linkTo,
  compRef,
  onClick,
  fieldValue,
  ...props
}) => {
  window.onmessage = function (e) {
    if (e.data) {
      if (typeof e.data !== "object") {
        compRef.current.value = e.data;
      }
    } else {
      notificationHandler({
        severity: "error",
        title: "Error in getting data from child window",
      });
      //Code for false
    }
  };
  const windowfeatures =
    "popup=yes,width=1000,height=700,status=yes, toolbar=no, menubar=yes, location=no,addressbar=no";

  return (
    <IconButton
      onClick={() => {
        const res = window.open(linkTo, "_blank", windowfeatures);
      }}
      {...props?.IconButtonProps}
    >
      <CreateIcon />
    </IconButton>
  );
};

export const fieldTypesComponentMapping = {
  string: {
    component: CustomTextField,
    props: {
      type: "text",
    },
  },
  int: {
    component: CustomTextField,
    props: {
      type: "number",
    },
  },
  float: {
    component: CustomTextField,
    props: {
      type: "number",
    },
  },
  bool: {
    component: Checkbox,
    props: {},
  },
  EmailStr: {
    component: CustomTextField,
    props: {
      type: "email",
    },
  },
  datetime: {
    component: DateTimePicker,
    props: {},
  },
  date: {
    component: DatePicker,
    props: {},
  },
};

export const getFieldComponentByType = (fieldInfo, mode) => {
  const CustomComponentConfig =
    fieldTypesComponentMapping[fieldInfo?.type || "string"] ||
    fieldTypesComponentMapping["string"];

  const CustomComponent = () => {
    const customRef = useRef();
    //getting component
    const Comp = CustomComponentConfig?.component;

    if (fieldInfo?.type === "datetime" || fieldInfo?.type === "date") {
      return (
        //for date && datetiem
        <Comp
          {...CustomComponentConfig?.props}
          datestring={fieldInfo?.value}
          disabled={mode !== "create"}
          renderInput={(params) => (
            <TextField {...params} name={fieldInfo?.fieldName} />
          )}
          ref={customRef}
        />
      );
    } else if (fieldInfo?.type === "bool") {
      //for checkbox
      return (
        <Comp
          {...CustomComponentConfig?.props}
          checked={fieldInfo?.value}
          name={fieldInfo?.fieldName}
          disabled={mode !== "create"}
          ref={customRef}
        />
      );
    } else {
      if (fieldInfo?.connected_with) {
        const [appName, modelName] = fieldInfo?.connected_with?.split(".");
        return (
          <Stack direction="row" alignItems="center">
            <Comp
              {...CustomComponentConfig?.props}
              name={fieldInfo?.fieldName}
              value={fieldInfo?.value || fieldInfo?.default}
              // disabled={!fieldInfo?.editable}
              required={fieldInfo?.required}
              compRef={customRef}
            />
            <CustomConnectedWith
              linkTo={`#/apps/${appName}/models/${modelName}/`}
              IconButtonProps={{
                sx: {
                  ml: "1rem",
                },
              }}
              fieldValue={fieldValue}
              compRef={customRef}
            />
          </Stack>
        );
      }
      return (
        //for normal (textfield)
        <Comp
          {...CustomComponentConfig?.props}
          name={fieldInfo?.fieldName}
          value={fieldInfo?.value}
          // disabled={!fieldInfo?.editable}
          ref={customRef}
          required={fieldInfo?.required}
        />
      );
    }
  };

  return CustomComponent;
};

export const validateFormData = (formRef, fields) => {
  let data = {};

  for (let i = 0; i < fields?.length; i++) {
    const formFieldName = fields[i].fieldName;

    if (formRef.current.elements[formFieldName]?.type === "checkbox") {
      //for checkbox
      if (formRef.current.elements[formFieldName]?.checked !== "on") {
        data[formFieldName] = formRef.current.elements[formFieldName].checked;
      } else {
        data[formFieldName] = false;
      }
    }
    //for date or datetime field
    else if (formRef.current.elements[formFieldName]?.type === "tel") {
      const value = formRef.current.elements[formFieldName].value;
      if (value.trim() === "") {
        return { data, error: `${formFieldName} cant be empty` };
      }
      //for date or datetime
      data[formFieldName] = formRef.current.elements[formFieldName].value;
    }
    //for textfield
    else {
      const value = formRef.current.elements[formFieldName].value;

      if (value.trim() === "" && fieldValue?.required) {
        return { data, error: `${formFieldName} cant be empty` };
      } else if (
        value.trim() === "" &&
        !fieldValue?.required &&
        fieldValue.connected_with
      ) {
        data[formFieldName] = null;
      } else {
        data[formFieldName] = formRef.current.elements[formFieldName].value;
      }
    }
  }

  return { data, error: null };
};
//check for valid date
function isValidDate(dateString) {
  //accepted format - 2018-08-01T18:30:00.000Z
  const _regExp = new RegExp(
    "^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$"
  );
  return _regExp.test(dateString);
}

//filter the data by it's value. Compares original with the current data
export const filterDataByChangedValue = (data, originalData) => {
  let filteredData = {};
  Object.keys(originalData).forEach((field) => {
    if (isValidDate(data[field])) {
      if (
        dayjs(data[field]).format("YYYY-MM-DDTHH:mm:ss") !==
        dayjs(originalData[field]).format("YYYY-MM-DDTHH:mm:ss")
      ) {
        filteredData[field] = dayjs(data[field]).format("YYYY-MM-DDTHH:mm:ss");
      }
      return;
    } else if (
      field !== "_id" &&
      field !== "id" &&
      originalData[field] !== data[field] &&
      originalData[field] !== undefined
    ) {
      filteredData[field] = data[field];
      return;
    }
  });

  return filteredData;
};
