//context
import GlobalContextProvider from "../../context/GlobalContext";
import AuthContextProvider from "../../context/AuthContext";
//libs
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//theme
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "../../theme/theme";

function Provider({ children }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalContextProvider>
        <AuthContextProvider>
          {children}
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
      </GlobalContextProvider>
    </ThemeProvider>
  );
}

export default Provider;
