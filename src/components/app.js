import { h } from "preact";
import { Router } from "preact-router";

import Header from "./header";

// Code-splitting is automated for `routes` directory
import Home from "../routes/home";
import Profile from "../routes/profile";
import Layout from "./layout";
//theme

import { ThemeProvider } from "@mui/material";
import { lightTheme as CustomTheme } from "../theme/theme";

const App = () => (
  <div id="app">
    {/* <Header /> */}
    <ThemeProvider theme={CustomTheme}>
      <Router>
        <Layout path="/"></Layout>
        {/* <Home path="/" /> */}
        {/* <Profile path="/profile/" user="me" /> */}
        {/* <Profile path="/profile/:user" /> */}
      </Router>
    </ThemeProvider>
  </div>
);

export default App;
