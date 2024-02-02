import Button from "@mui/material/Button";
import { useFormikContext } from "formik";
//types
import { ButtonProps } from "@mui/material/Button";

//types
interface PropTypes extends ButtonProps {
  variant: "outlined" | "contained" | "text";
  children: React.ReactNode;
  [props: string]: any;
}
const ButtonWrapper = ({ children, variant, ...props }: PropTypes) => {
  const { submitForm } = useFormikContext();
  const handleSubmit = () => {
    submitForm();
  };
  const sx = props?.sx;
  delete props?.sx;
  const configButton = {
    onClick: handleSubmit,
    sx: {
      backgroundColor: variant === "contained" ? "#2f7ec7" : "unset",
      mt: "32px",
      ":hover": {
        backgroundColor: variant === "contained" ? "#1f5c94" : "unset",
        color: variant === "contained" ? "#fff" : "unset",
      },
      color: variant === "contained" ? "#fff" : "unset",

      maxHeight: "64px",
      padding: "15px",
      borderRadius: "5px",
      ...sx,
    },
    disableElevation: true,
    // fullWidth: true,
    ...props,
  };

  return (
    <Button {...configButton} variant={variant}>
      {children}
    </Button>
  );
};
ButtonWrapper.defaultProps = {
  variant: "contained",
};
export default ButtonWrapper;
