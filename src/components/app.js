import { h } from "preact";

//theme
import { ThemeProvider } from "@mui/material";
import { lightTheme as CustomTheme } from "../theme/theme";
import AppRoutes from "../routes";
//context
import AuthContextProvider from "../context/AuthContext";
//libs
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = (e) => (
  <div id="app">
    <ThemeProvider theme={CustomTheme}>
      <AuthContextProvider>
        <AppRoutes />
        <ToastContainer
          style={{ width: "400px" }}
          limit={5}
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </AuthContextProvider>
    </ThemeProvider>
  </div>
);

export default App;
