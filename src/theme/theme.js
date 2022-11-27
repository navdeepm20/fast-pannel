import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2f7ec7",
    },
    white: {
      main: "#fff",
    },
    sky_blue: {
      main: "#edeff2",
    },
  },
  typography: {
    fontFamily: ["verdana,sans-serif"],
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: ["verdana,sans-serif"],
  },
});
