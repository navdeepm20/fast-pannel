import Select, { SelectProps } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { useField } from "formik";

//types
interface PropTypes extends SelectProps {
  name: string;
  children: React.ReactNode;
}

export default function SelectWrapper({ name, children, ...props }: PropTypes) {
  const [field, meta] = useField(name); //field name

  let error;
  let helperText;
  const sx = props?.sx;
  delete props?.sx;
  const config = {
    ...field,
    sx: {
      backgroundColor: "#2f7ec7",
      mt: "32px",
      ":hover": {
        backgroundColor: "#1f5c94",
      },
      maxHeight: "64px",
      padding: "15px",
      borderRadius: "5px",
      ...sx,
    },
    // fullWidth: true,
    ...props,
  };

  if (meta && meta.touched && meta.error) {
    error = true;
    helperText = meta.error;
  }

  return (
    <FormControl error={error} fullWidth>
      <Select {...config} sx={{ ...sx }}>
        {children}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
