import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
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
