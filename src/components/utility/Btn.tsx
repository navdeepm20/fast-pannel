//mui
import Button from "@mui/material/Button";
import { SxProps } from "@mui/material";

function Btn({
  sx,
  disabled,
  onClick,
  children,
  ...props
}: {
  sx?: SxProps;
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
}) {
  const buttonConfig = {
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
    ...props,
  };

  return <Button {...buttonConfig}>{children}</Button>;
}

export default Btn;
