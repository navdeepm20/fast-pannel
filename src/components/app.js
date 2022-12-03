import { h } from "preact";
import { Router } from "preact-router";

// Code-splitting is automated for `routes` directory
import Layout from "./layout";

//theme
import { ThemeProvider } from "@mui/material";
import { lightTheme as CustomTheme } from "../theme/theme";
import AppRoutes from "../routes";
//context
import AuthContextProvider from "../context/AuthContext";
const App = (e) => (
  <div id="app">
    <ThemeProvider theme={CustomTheme}>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </ThemeProvider>
  </div>
);

export default App;
