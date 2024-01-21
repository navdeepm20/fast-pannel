import React from "react";
//mui
import Icon from "@mui/material/Icon";

function SvgWrapper({ SvgImg, width, height, ...props }) {
  const sx = {
    ...props?.sx,
  };
  delete props?.sx;
  return (
    <Icon
      {...props}
      sx={{
        position: "relative",
        width: width,
        height: height,
        ...sx,
      }}
      component="p"
    >
      <img
        src={SvgImg}
        alt="play-icon"
        width={width}
        height={height}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
    </Icon>
  );
}

export default SvgWrapper;
