import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";

const TextFieldWrapper = ({ name, ...props }: TextFieldProps) => {
  const [field, meta] = useField(name || ""); //field name
  const configTextField = {
    ...field,
    fullWidth: true,
    ...props,
  };
  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return <TextField {...configTextField} />;
};

export default TextFieldWrapper;
