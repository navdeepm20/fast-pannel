//mui
import Button, { ButtonProps } from "@mui/material/Button";
import { SxProps } from "@mui/system";

//tyeps
interface ButtonTypes extends ButtonProps {
  sx?: SxProps;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
  children: React.ReactNode;
}

function Btn({ sx, disabled, onClick, children, ...props }: ButtonTypes) {
  const buttonConfig: ButtonProps = {
    variant: "contained",
    // disableElevation: true,
    sx: {
      backgroundColor:
        props?.variant !== "text" && props?.variant !== "outlined"
          ? "#2f7ec7"
          : "",
      borderRadius: "4px",
      ":hover": {
        backgroundColor:
          props?.variant !== "text" && props?.variant !== "outlined"
            ? "#236099"
            : "",
      },
      ...sx,
    },
    disabled,
    onClick,
    ...props,
  };

  return <Button {...buttonConfig}>{children}</Button>;
}

export default Btn;
