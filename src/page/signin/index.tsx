//preact
import { useEffect, useState } from "preact/hooks";
//mui

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

//assets
import fastpanel_logo from "../../assets/logo/fast-panel-logo-2.png";
import { ChangeEvent } from "preact/compat";

export default function SignIn({ ...props }) {
  const { user, dispatch } = useAuth();
  const { mutationResponse, mutationLoading, axiosFetch } = useAxiosFunction();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (event: MouseEvent) => {
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
    if (mutationResponse?.status === 200) {
      dispatch({
        type: "signin",
        payload: {
          isAuthenticated: true,
          user: mutationResponse?.data?.user,
          token: mutationResponse.data?.access_token,
        },
      });
      navigate("/");
    }
  }, [mutationResponse]);

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
                onChange={(e: Event) =>
                  setCredentials((prev) => {
                    return {
                      ...prev,
                      username: (e?.target as HTMLInputElement)?.value,
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
                onChange={(e: Event) =>
                  setCredentials((prev) => {
                    return {
                      ...prev,
                      password: (e?.target as HTMLInputElement)?.value,
                    };
                  })
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={mutationLoading}
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
