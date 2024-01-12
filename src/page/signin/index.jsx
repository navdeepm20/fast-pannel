//preact
import { useEffect, useState } from "preact/hooks";
//mui
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
//hooks
import useAuth from "../../hooks/useAuth";
import { axiosInstance } from "../../axios";
import useAxiosFunction from "../../hooks/useAxiosFunction";
//libs
import { useNavigate, Navigate } from "react-router-dom";
//utils
import urls from "../../utils/urls.json";
// internal
import SvgWrapper from "../../components/svg";
//assets
import fastpanel_logo from "../../assets/logo/fast-panel-logo-2.png";

export default function SignIn({ ...props }) {
  const [user, dispatch] = useAuth();
  const [response, error, loading, axiosFetch] = useAxiosFunction();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("username", credentials?.username);
    data.append("password", credentials?.password);
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "POST",
      url: urls.signin,
      data: data,
    });
  };

  useEffect(() => {
    if (response?.status === 200) {
      dispatch({
        type: "signin",
        payload: {
          isAuthenticated: true,
          user: response?.data?.user,
          token: response.data?.access_token,
        },
      });
      navigate("/");
    }
  }, [response]);

  return (
    <>
      {!user?.isAuthenticated ? (
        <Container
          maxWidth="xs"
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: "translateY(-50%)",
            }}
          >
            <img
              src={fastpanel_logo}
              alt="logo"
              style={{ width: "50px", height: "50px", marginBottom: "1rem" }}
            />

            <Typography component="h1" variant="h5" sx={{}}>
              Fast Pannel
            </Typography>
            <Typography
              component="span"
              variant="span"
              sx={{ fontStyle: "italic", color: "text.grey" }}
            >
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={credentials?.username}
                onChange={(e) =>
                  setCredentials((prev) => {
                    return {
                      ...prev,
                      username: e.target.value,
                    };
                  })
                }
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={credentials?.password}
                onChange={(e) =>
                  setCredentials((prev) => {
                    return { ...prev, password: e.target.value };
                  })
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
