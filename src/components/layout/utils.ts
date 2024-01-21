export const DRAWER_WIDTH = 300;
export const CLOSED_DRAWER_WIDTH = 64;
export const NAVBAR_HEIGHT = 114;

import { styled } from "@mui/material/styles";

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),

  paddingTop: theme.spacing(2),
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
}));
