//preact
import { useState } from "preact/hooks";
//mui
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { DRAWER_WIDTH, CLOSED_DRAWER_WIDTH } from "../utils";
//internal
import OptionsMenu from "./OptionsMenu";
//utils
import { useLocation } from "react-router-dom";

//custom app bar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...(open && {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    width: `calc(100% - ${CLOSED_DRAWER_WIDTH}px)`,
  }),
}));

const Navbar = ({ open, handleDrawerOpen, height, ...props }) => {
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [, dispatch] = useAuth();
  // const menuOpen = Boolean(anchorEl);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   logout(dispatch);
  //   setAnchorEl(null);
  // };

  const location = useLocation();

  const getPageTitle = (location) => {
    return location === "/profile" ? "Profile" : "Apps";
  };

  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{
        background: "#fff",

        // boxShadow: "0 8px 16px 0 rgb(145 158 171 / 16%)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: height,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "#000" }}
          >
            {getPageTitle(location.pathname)}
          </Typography>
        </Box>
        {/* <Box sx={{ cursor: "pointer" }} onClick={handleClick}>
          <Avatar sx={{ backgroundColor: "#673ab7", mr: "8px" }}>N</Avatar>
          <OptionsMenu
            open={menuOpen}
            anchorEl={anchorEl}
            handleClose={handleClose}
          />
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

Navbar.defaultProps = {
  open: true,
  handleDrawerOpen: () => {},
};
export default Navbar;
