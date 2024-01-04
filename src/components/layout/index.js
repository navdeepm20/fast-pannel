//preact
import { useState } from "preact/hooks";
//mui
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
//utils
import { DRAWER_WIDTH, NAVBAR_HEIGHT } from "./utils";
import { Main } from "./utils";
//internal
import LogoutConfirmationDialog from "../dialogs/LogoutConfirmationDialog";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
//libs
import { Outlet } from "react-router-dom";

//hooks
import useAuth from "../../hooks/useAuth";
import useGlobalContext from "../../hooks/useGlobalContext";
import { logout } from "../../utils/utility";
//utils
export default function Layout() {
  const [open, setOpen] = useState(true);
  const { isLogoutDialogOpen, setIsLogoutDialogOpen } = useGlobalContext();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [_, dispatch] = useAuth();

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
      {/* dialogs */}
      <LogoutConfirmationDialog
        open={isLogoutDialogOpen}
        handleClose={(e) => setIsLogoutDialogOpen(false)}
        handleLogout={(e) => {
          setIsLogoutDialogOpen(false);
          logout(dispatch);
        }}
      />
    </Box>
  );
}
