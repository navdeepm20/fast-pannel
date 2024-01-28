//mui
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
//internal
import CustomButton from "../../components/utility/Btn";

interface CustomCellWithButtonTypes {
  title: string;
  icon: React.ReactNode;
  clickHandler: (event: MouseEvent) => void;
  [props: string]: any;
}
function CustomCellWithButton({
  title,
  icon,
  clickHandler,
  ...props
}: CustomCellWithButtonTypes) {
  return (
    <CustomButton
      startIcon={icon}
      onClick={(event: MouseEvent) => {
        clickHandler(event);
      }}
      {...props}
    >
      {title}
    </CustomButton>
  );
}
interface CustomCellWithLinkTextTypes {
  children: React.ReactNode;
  [props: string]: any;
}
function CustomCellWithLinkText({
  children,
  ...props
}: CustomCellWithLinkTextTypes) {
  return (
    <Link to={props?.linkTo} style={{ textDecoration: "none" }}>
      <Typography {...props}>{children}</Typography>
    </Link>
  );
}

export { CustomCellWithButton, CustomCellWithLinkText };
