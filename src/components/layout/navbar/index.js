import { h } from "preact";
//mui
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { DRAWER_WIDTH } from "../../../utils/utility";

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
    marginLeft: `${DRAWER_WIDTH}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Navbar = ({ open, handleDrawerOpen, ...props }) => {
  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{
        background: "#fff",
        boxShadow: "0 8px 16px 0 rgb(145 158 171 / 16%)",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            mr: 2,
            ...(open && { display: "none" }),
            color: "text.primary",
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ color: "#000" }}>
          Fast pannel
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Navbar.defaultProps = {
  open: true,
  handleDrawerOpen: () => {},
};
export default Navbar;
