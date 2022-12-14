import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    sidebar: {
      dark: "#111827",
    },
    navitem: {
      hover: "#242a38",
    },
    primary: {
      main: "#2f7ec7",
    },
    danger: {
      main: "#D92D20",
      hover: "#c5261a",
    },
    white: {
      main: "#fff",
    },
    sky_blue: {
      main: "#edeff2",
    },
    text: {
      white: "#fff",
      grey: "#8a8a8a",
      black: "#000000",
    },
    shadow: {
      main: "rgba(0, 0, 0, 0.04)",
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
