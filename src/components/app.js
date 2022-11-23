import { h } from "preact";
import { Router } from "preact-router";

// Code-splitting is automated for `routes` directory
import Layout from "./layout";

//theme
import { ThemeProvider } from "@mui/material";
import { lightTheme as CustomTheme } from "../theme/theme";
import AppRoutes from "../routes";

const App = (e) => (
  <div id="app">
    <ThemeProvider theme={CustomTheme}>
      <AppRoutes />
    </ThemeProvider>
  </div>
);

export default App;
