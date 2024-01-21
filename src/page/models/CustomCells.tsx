//mui
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
//internal
import CustomButton from "../../components/utility/Btn";

function CustomCellWithButton({ title, icon, clickHandler, ...props }) {
  return (
    <CustomButton
      startIcon={icon}
      onClick={(e) => {
        clickHandler(e);
      }}
      {...props}
    >
      {title}
    </CustomButton>
  );
}
function CustomCellWithLinkText({ children, ...props }) {
  return (
    <Link to={props?.linkTo} style={{ textDecoration: "none" }}>
      <Typography {...props}>{children}</Typography>
    </Link>
  );
}

export { CustomCellWithButton, CustomCellWithLinkText };
