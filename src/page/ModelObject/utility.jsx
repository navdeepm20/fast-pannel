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
import { Stack } from "@mui/material";
import { logout, notificationHandler } from "../../utils/utility";

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
        style: { padding: "8px" },
      }}
      placeholder={props?.name}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        sx: { p: 0 },
      }}
      // label={props?.name}
      // multiline
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
    type: "string",
  },
  integer: {
    component: CustomTextField,
    props: {
      type: "number",
    },
    type: "integer",
  },
  float: {
    component: CustomTextField,
    props: {
      type: "number",
    },
    type: "float",
  },
  boolean: {
    component: Checkbox,
    props: {},
    type: "boolean",
  },
  EmailStr: {
    component: CustomTextField,
    props: {
      type: "email",
    },
    type: "email",
  },
  ["date-time"]: {
    component: DateTimePicker,
    props: {},
    type: "datetime",
  },
  date: {
    component: DatePicker,
    props: {},
    type: "date",
  },
  // time: {
  //   component: DatePicker,
  //   props: {},
  // },
};
const getFieldConfigByType = (fieldInfo) => {
  if (fieldInfo?.anyOf) {
    const filtered = fieldInfo?.anyOf?.filter((fieldType) => fieldType?.format);
    const config =
      fieldTypesComponentMapping[filtered[0]?.format] ||
      fieldTypesComponentMapping["string"];

    return {
      ...config,
      props: { ...config?.props, name: fieldInfo?.fieldName },
    };
  } else {
    return (
      fieldTypesComponentMapping[fieldInfo?.type] ||
      fieldTypesComponentMapping["string"]
    );
  }
};

export const getFieldComponentByType = (fieldInfo, mode) => {
  const CustomComponentConfig = getFieldConfigByType(fieldInfo);
  // console.log(CustomComponentConfig);
  const CustomComponent = ({ ...props }) => {
    const customRef = useRef();
    //getting component
    const Comp = CustomComponentConfig?.component;

    // console.log(fieldInfo, "datetime", "asdlfjaksjdfkjasdjfljaksdfj");
    //
    switch (CustomComponentConfig?.type) {
      case "datetime":
        return (
          <Comp
            {...CustomComponentConfig?.props}
            datestring={fieldInfo?.value}
            // disabled={mode !== "create"}
            InputProps={{
              name: fieldInfo?.fieldName,
            }}
            ref={customRef}
          />
        );
      case "date":
        return (
          <Comp
            {...CustomComponentConfig?.props}
            datestring={fieldInfo?.value}
            // disabled={mode !== "create"}
            InputProps={{
              name: fieldInfo?.fieldName,
            }}
            ref={customRef}
          />
        );
      case "boolean":
        return (
          <Comp
            {...CustomComponentConfig?.props}
            defaultChecked={fieldInfo?.value}
            name={fieldInfo?.fieldName}
            // disabled={mode !== "create"}
            ref={customRef}
          />
        );
      case "string":
        return (
          <Comp
            {...CustomComponentConfig?.props}
            name={fieldInfo?.fieldName}
            value={fieldInfo?.value}
            // disabled={!fieldInfo?.editable}
            ref={customRef}
            required={fieldInfo?.required}
          />
        );
      case "boolean":
        return (
          <Comp
            {...CustomComponentConfig?.props}
            name={fieldInfo?.fieldName}
            value={fieldInfo?.value}
            // disabled={!fieldInfo?.editable}
            ref={customRef}
            required={fieldInfo?.required}
          />
        );
      default:
        return (
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

    // if (fieldInfo?.connected_with) {
    //   const [appName, modelName] = fieldInfo?.connected_with?.split(".");
    //   return (
    //     <Stack direction="row" alignItems="center">
    //       <Comp
    //         {...CustomComponentConfig?.props}
    //         name={fieldInfo?.fieldName}
    //         value={fieldInfo?.value || fieldInfo?.default}
    //         // disabled={!fieldInfo?.editable}
    //         required={fieldInfo?.required}
    //         compRef={customRef}
    //       />
    //       <CustomConnectedWith
    //         linkTo={`#/apps/${appName}/models/${modelName}/`}
    //         IconButtonProps={{
    //           sx: {
    //             ml: "1rem",
    //           },
    //         }}
    //         fieldValue={fieldValue}
    //         compRef={customRef}
    //       />
    //     </Stack>
    //   );
    // }
    // return (
    //   //for normal (textfield)
    //   <Comp
    //     {...CustomComponentConfig?.props}
    //     name={fieldInfo?.fieldName}
    //     value={fieldInfo?.value}
    //     // disabled={!fieldInfo?.editable}
    //     ref={customRef}
    //     required={fieldInfo?.required}
    //   />
    // );
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
    } else if (formRef.current.elements[formFieldName]?.type === "number") {
      const value = formRef.current.elements[formFieldName].value;
      if (value.trim() === "") {
        return { data, error: `${formFieldName} cant be empty` };
      }
      //check for number
      if (!isNaN(formRef.current.elements[formFieldName].value)) {
        data[formFieldName] = Number(
          formRef.current.elements[formFieldName].value
        );
      }
    }
    //for textfield
    else {
      const value = formRef.current.elements[formFieldName]?.value;

      if (value.trim() === "" && fields[i]?.required) {
        return { data, error: `${formFieldName} cant be empty` };
      } else if (
        value.trim() === "" &&
        !fields[i]?.required &&
        fields[i].connected_with
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
