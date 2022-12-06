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

export const getFieldComponentByType = (fieldName, fieldValue) => {
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
          renderInput={(params) => <TextField {...params} name={fieldName} />}
        />
      );
    } else if (fieldValue?.type === "bool") {
      return (
        <Comp
          {...CustomComponentConfig?.props}
          checked={fieldValue?.value}
          name={fieldName}
        />
      );
    }
    return (
      <Comp
        {...CustomComponentConfig?.props}
        name={fieldName}
        value={fieldValue?.value}
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
      data[fieldName] = dayjs(
        formRef.current.elements[fieldName].value
      ).format();
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

export const filterDataByChangedValue = (data, originalData) => {
  let filterData = {};
  Object.keys(originalData).forEach((field) => {
    console.log(
      originalData[field],
      data[field],
      originalData[field] === data[field]
    );
    if (
      originalData[field] !== data[field] &&
      originalData[field] !== undefined
    ) {
      filterData[field] = data[field];
    }
  });
  console.log(filterData);
};
