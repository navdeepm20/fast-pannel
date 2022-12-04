//preact
import { useState } from "preact/hooks";
//mui
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
//3rd party
import { format } from "date-fns";
//intenal
import UpdateNameForm from "./UpdateNameForm";
import UpdatePasswordForm from "./UpdatePasswordForm";

export default function UpdateProfileForm(props) {
  return (
    <>
      <Container
        maxWidth={false}
        style={{
          padding: "0",
          boxShadow: `0px 3px 20px 4px rgba(0, 0, 0, 0.04)`,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",

            padding: "32px",
          }}
        >
          <Stack
            direction="column"
            spacing={1}
            sx={{ borderBottom: " 1px solid #EAEAEA", pb: "8px" }}
          >
            <Typography fontSize="20px" fontWeight="500" color="#0F0F0F">
              Personal info
            </Typography>
            <Typography fontSize="14px" fontWeight="500" color="#898989">
              View & update your personal details here
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="flex-start">
            <Stack
              spacing={2}
              sx={{ my: "38px", width: { lg: "80%", xl: "60%" } }}
            >
              <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
                <Typography
                  fontSize="16px"
                  width="45%"
                  fontWeight="400"
                  color="#898989"
                >
                  Name
                </Typography>
                <Stack direction="row" gap={2} sx={{ width: "100%" }}>
                  <TextField
                    type="text"
                    disabled
                    value={(props.firstName && props.firstName) || ""}
                    id="first-name"
                    inputProps={{
                      style: {
                        padding: "10px",
                        fontSize: "16px",
                        color: "#0F0F0F",
                        fontFamily: "DM Sans",
                      },
                    }}
                    sx={{
                      borderRadius: "5px",
                      backgroundColor: "#F6F6F6",
                      borderColor: "#E0E0E0",
                      width: "50%",
                    }}
                  />
                  <TextField
                    type="text"
                    disabled
                    value={(props.lastName && props.lastName) || ""}
                    id="last-name"
                    inputProps={{
                      style: {
                        padding: "10px",
                        fontSize: "16px",
                        color: "#0F0F0F",
                        fontFamily: "DM Sans",
                      },
                    }}
                    sx={{
                      borderRadius: "5px",
                      backgroundColor: "#F6F6F6",
                      borderColor: "#E0E0E0",
                      width: "50%",
                    }}
                  />
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Typography
                  fontSize="16px"
                  width="45%"
                  fontWeight="400"
                  color="#898989"
                >
                  Email address
                </Typography>
                <TextField
                  disabled
                  type="email"
                  id="email"
                  value={(props.email && props.email) || ""}
                  inputProps={{
                    style: {
                      padding: "10px",
                      fontSize: "16px",
                      color: "#0F0F0F",
                      fontFamily: "DM Sans",
                    },
                  }}
                  sx={{
                    borderRadius: "5px",
                    backgroundColor: "#F6F6F6",
                    borderColor: "#E0E0E0",
                    width: "100%",
                  }}
                />
              </Stack>
              <Stack direction="row" alignItems="center">
                <Typography
                  fontSize="16px"
                  width="45%"
                  fontWeight="400"
                  color="#898989"
                >
                  Username
                </Typography>
                <TextField
                  disabled
                  type="email"
                  id="username"
                  value={(props.username && props.username) || ""}
                  inputProps={{
                    style: {
                      padding: "10px",
                      fontSize: "16px",
                      color: "#0F0F0F",
                      fontFamily: "DM Sans",
                    },
                  }}
                  sx={{
                    borderRadius: "5px",
                    backgroundColor: "#F6F6F6",
                    borderColor: "#E0E0E0",
                    width: "100%",
                  }}
                />
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  fontSize="16px"
                  fontWeight="400"
                  color="#898989"
                  width="45%"
                >
                  Password
                </Typography>
                <TextField
                  inputProps={{
                    style: {
                      padding: "10px",
                      fontSize: "16px",
                      color: "#0F0F0F",
                      fontFamily: "DM Sans",
                    },
                  }}
                  type="password"
                  sx={{
                    borderRadius: "5px",
                    backgroundColor: "#F6F6F6",
                    borderColor: "#E0E0E0",
                    width: "100%",
                  }}
                  defaultValue="**********"
                  disabled={true}
                />
              </Stack>
              <Stack direction="row" alignItems="center">
                <Typography
                  fontSize="16px"
                  fontWeight="400"
                  color="#898989"
                  width="31%"
                  paddingRight="8px"
                >
                  Account Created On
                </Typography>

                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "21px",
                    color: "#0f0f0f",
                  }}
                >
                  {props?.created_on
                    ? format(new Date(props.created_on), "dd MMM yyyy")
                    : ""}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Typography
                  fontSize="16px"
                  fontWeight="400"
                  color="#898989"
                  width="31%"
                  paddingRight="8px"
                >
                  Last Login
                </Typography>

                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "21px",
                    color: "#0f0f0f",
                  }}
                >
                  {props?.last_login
                    ? format(new Date(props.last_login), "dd MMM yyyy")
                    : ""}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction="column"
              justifyContent="space-between"
              sx={{ my: "38px", height: "160px", pl: "8px" }}
            >
              <UpdateNameForm
                updateProfileHandler={props.updateProfile}
                firstName={(props.firstName && props.firstName) || ""}
                lastName={(props.lastName && props.lastName) || ""}
                email={(props.email && props.email) || ""}
                username={(props.username && props.username) || ""}
              />
              {/* <UpdatePasswordForm updatePassword={props.updatePassword} /> */}
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
