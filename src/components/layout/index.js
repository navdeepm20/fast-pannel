//preact
import { useState } from "preact/hooks";

import { styled, useTheme } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { DRAWER_WIDTH, NAVBAR_HEIGHT, CLOSED_DRAWER_WIDTH } from "./utils";
import DrawerHeader from "./drawer_header";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: `${NAVBAR_HEIGHT}px`,
    height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,

    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

export default function Layout() {
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
      <Navbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        height={NAVBAR_HEIGHT}
      />
      <Sidebar
        open={open}
        DRAWER_WIDTH={DRAWER_WIDTH}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Main open={open}>
        <Outlet />
      </Main>
    </Box>
  );
}
