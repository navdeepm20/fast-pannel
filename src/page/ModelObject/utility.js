import { useState } from "preact/hooks";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import DateTimePicker from "../../components/utility/DateTimePicker";
import DatePicker from "../../components/utility/DatePicker";
//libs
import dayjs from "dayjs";

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

const CustomTextField = ({ ...props }) => {
  const [value, setValue] = useState(props.value);
  return (
    <TextField
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export const fieldTypesComponentMapping = {
  str: {
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

export const getFieldComponentByType = (fieldName, fieldValue, mode) => {
  const CustomComponentConfig =
    fieldTypesComponentMapping[fieldValue?.type || "str"] ||
    fieldTypesComponentMapping["str"];

  const CustomComponent = () => {
    const Comp = CustomComponentConfig?.component;
    if (fieldValue?.type === "datetime" || fieldValue?.type === "date") {
      return (
        <Comp
          {...CustomComponentConfig?.props}
          datestring={fieldValue?.value}
          disabled={mode !== "create" && !fieldValue?.editable}
          renderInput={(params) => <TextField {...params} name={fieldName} />}
        />
      );
    } else if (fieldValue?.type === "bool") {
      return (
        <Comp
          {...CustomComponentConfig?.props}
          checked={fieldValue?.value}
          name={fieldName}
          disabled={mode !== "create" && !fieldValue?.editable}
        />
      );
    }
    return (
      <Comp
        {...CustomComponentConfig?.props}
        name={fieldName}
        value={fieldValue?.value}
        disabled={!fieldValue?.editable}
      />
    );
  };

  return CustomComponent;
};

export const validateFormData = (formRef, fields) => {
  let data = {};

  for (let i = 0; i < fields?.length; i++) {
    const fieldName = Object.entries(fields[i])[0][0];
    const fieldValue = Object.entries(fields[i])[0][1];

    if (formRef.current.elements[fieldName]?.type === "checkbox") {
      //for checkbox
      if (formRef.current.elements[fieldName]?.checked !== "on") {
        data[fieldName] = formRef.current.elements[fieldName].checked;
      } else {
        data[fieldName] = false;
      }
    } else if (formRef.current.elements[fieldName]?.type === "tel") {
      const value = formRef.current.elements[fieldName].value;

      if (value.trim() === "") {
        return { data, error: `${fieldName} cant be empty` };
      }
      //for date or datetime
      data[fieldName] = formRef.current.elements[fieldName].value;
    } else {
      const value = formRef.current.elements[fieldName].value;
      if (value.trim() === "" && fieldValue?.required) {
        return { data, error: `${fieldName} cant be empty` };
      }
      data[fieldName] = formRef.current.elements[fieldName].value;
    }
  }

  return { data, error: null };
};
function isValidDate(dateString) {
  //accepted format - 2018-08-01T18:30:00.000Z
  const _regExp = new RegExp(
    "^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$"
  );
  return _regExp.test(dateString);
}

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
  console.log(filteredData);
  return filteredData;
};
