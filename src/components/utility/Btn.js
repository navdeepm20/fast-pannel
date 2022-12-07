import React from "react";
import PropTypes from "prop-types";
//mui
import Button from "@mui/material/Button";
function Btn({ ...props }) {
  const sx = props.sx;

  delete props.sx;
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

  return <Button {...buttonConfig}>{props.children}</Button>;
}

export default Btn;
