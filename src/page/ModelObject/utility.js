import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import DateTimePicker from "../../components/utility/DateTimePicker";
import DatePicker from "../../components/utility/DatePicker";

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
          type: getFieldType(col, row),
        };
      }
    });
  }
  return [];
};

const propsInjector = (props) => props;
export const fieldTypesComponentMapping = {
  str: {
    component: TextField,
    props: {
      type: "text",
    },
  },
  bool: {
    component: Checkbox,
    props: {},
  },
  EmailStr: {
    component: TextField,
    props: {
      type: "email",
    },
  },
  datetime: {
    component: DateTimePicker,
    props: {
      // renderInput: (params) => {
      //   console.log(params);
      //   <TextField {...params} />;
      // },
    },
  },
  date: {
    component: DatePicker,
    props: {
      // renderInput: (params) => {
      //   <TextField {...params} />;
      // },
    },
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
          renderInput={(params) => <TextField {...params} name={fieldName} />}
        />
      );
    }
    return <Comp {...CustomComponentConfig?.props} name={fieldName} />;
  };

  return CustomComponent;
};
