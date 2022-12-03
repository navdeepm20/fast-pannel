import { useState } from "preact/hooks";
// import PropTypes from "prop-types";
import { Stack, Paper, Button } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
//3rd party
import { Formik, Form } from "formik";
import * as yup from "yup";
import { FORM_VALIDATION } from "../utils/formValidation";
// internal
import ButtonWrapper from "./FormComponents/Button";
import TextField from "../forms/FormComponents/TextField";

const LOCAL_FORM_VALIDATION = yup.object().shape({
  first_name: FORM_VALIDATION["first_name"],
  last_name: FORM_VALIDATION["last_name"],
  email: FORM_VALIDATION["email"],
  username: FORM_VALIDATION["username"],
});

export default function UpdateNameForm(props) {
  const [open, setOpen] = useState(false);

  const FORM_INITIAL_VALUES = {
    first_name: props.firstName ? props.firstName : "",
    last_name: props.lastName ? props.lastName : "",
    email: props.email ? props?.email : "",
    username: props.username ? props?.username : "",
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Formik
      initialValues={FORM_INITIAL_VALUES}
      validationSchema={LOCAL_FORM_VALIDATION}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await props.updateProfileHandler({
          first_name: values?.first_name,
          last_name: values?.last_name,
          email: values?.email,
          username: values?.username,
        });
        setSubmitting(false);
        handleClose();
      }}
    >
      {({ isSubmitting, isValid }) => {
        return (
          <Form>
            <Button
              sx={{
                color: "#2F7EC7",
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "none",
              }}
              onClick={handleClickOpen}
            >
              Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <Paper
                sx={{
                  width: "100%",
                }}
              >
                <DialogContent>
                  <Stack direction="column" alignItems="flex-start" spacing={3}>
                    <Stack
                      direction="column"
                      alignItems="flex-start"
                      spacing={1}
                    >
                      <DialogContentText
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: "#898989",
                        }}
                      >
                        First Name
                      </DialogContentText>
                      <TextField
                        type="text"
                        name="first_name"
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            background: "transparent",
                            ":hover": {
                              borderRadius: "8px",
                            },
                          },
                        }}
                        sx={{
                          width: "532px",
                          background: "transparent",
                          "& input": {
                            borderRadius: "8px",
                            border: "1px solid #E0E0E0",
                            padding: "12px",
                            background: "#F6F6F6",
                          },
                        }}
                      />
                    </Stack>

                    <Stack
                      direction="column"
                      alignItems="flex-start"
                      spacing={1}
                    >
                      <DialogContentText
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: "#898989",
                        }}
                      >
                        Last Name
                      </DialogContentText>
                      <TextField
                        type="text"
                        name="last_name"
                        variant="filled"
                        // value={props?.lastName}
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            background: "transparent",
                            ":hover": {
                              borderRadius: "8px",
                            },
                          },
                        }}
                        sx={{
                          width: "532px",
                          background: "transparent",
                          "& input": {
                            borderRadius: "8px",
                            border: "1px solid #E0E0E0",
                            padding: "12px",
                            background: "#F6F6F6",
                          },
                        }}
                      />
                    </Stack>
                    <Stack
                      direction="column"
                      alignItems="flex-start"
                      spacing={1}
                    >
                      <DialogContentText
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: "#898989",
                        }}
                      >
                        Email
                      </DialogContentText>
                      <TextField
                        type="email"
                        name="email"
                        variant="filled"
                        // value={props?.email}
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            background: "transparent",
                            ":hover": {
                              borderRadius: "8px",
                            },
                          },
                        }}
                        sx={{
                          width: "532px",
                          background: "transparent",
                          "& input": {
                            borderRadius: "8px",
                            border: "1px solid #E0E0E0",
                            padding: "12px",
                            background: "#F6F6F6",
                          },
                        }}
                      />
                    </Stack>
                    <Stack
                      direction="column"
                      alignItems="flex-start"
                      spacing={1}
                    >
                      <DialogContentText
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: "#898989",
                        }}
                      >
                        Username
                      </DialogContentText>
                      <TextField
                        type="text"
                        name="username"
                        variant="filled"
                        // value={props?.username}
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            background: "transparent",
                            ":hover": {
                              borderRadius: "8px",
                            },
                          },
                        }}
                        sx={{
                          width: "532px",
                          background: "transparent",
                          "& input": {
                            borderRadius: "8px",
                            border: "1px solid #E0E0E0",
                            padding: "12px",
                            background: "#F6F6F6",
                          },
                        }}
                      />
                    </Stack>

                    <Stack
                      sx={{ width: "100%" }}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Button
                        sx={{
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#959595",
                          textTransform: "none",
                        }}
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>

                      <ButtonWrapper
                        disableElevation
                        disabled={!isValid || isSubmitting}
                        sx={{ mt: 0, minWidth: "100px", p: "8px 12px" }}
                      >
                        Save
                      </ButtonWrapper>
                    </Stack>
                  </Stack>
                </DialogContent>
              </Paper>
            </Dialog>
          </Form>
        );
      }}
    </Formik>
  );
}
