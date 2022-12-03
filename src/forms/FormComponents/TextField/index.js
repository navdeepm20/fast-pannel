import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

const TextFieldWrapper = ({ name, ...props }) => {
  const [field, meta] = useField(name); //field name
  const configTextField = {
    ...field,
    fullWidth: true,
    variant: "outlined",
    ...props,
  };
  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return <TextField {...configTextField} />;
};

export default TextFieldWrapper;
