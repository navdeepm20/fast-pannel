//mui
import { styled } from "@mui/material/styles";

const CustomDrawer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const DrawerHeader = ({ children, sx, ...props }) => {
  return <CustomDrawer sx={{ ...sx }}>{children}</CustomDrawer>;
};

export default DrawerHeader;
