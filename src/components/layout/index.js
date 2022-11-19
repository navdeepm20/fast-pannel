//preact
import { useState } from "preact/hooks";

import { styled, useTheme } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { DRAWER_WIDTH } from "../../utils/utility";
import DrawerHeader from "./drawer_header";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${DRAWER_WIDTH}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

export default function Layout() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <CssBaseline />
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar
        open={open}
        DRAWER_WIDTH={DRAWER_WIDTH}
        handleDrawerClose={handleDrawerClose}
      />
      <Main open={open}>
        <DrawerHeader />
        <h3>Child Components</h3>
      </Main>
    </Box>
  );
}
