import { useState } from "preact/hooks";
import { Stack, Paper, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//3rd party
import { Formik, Form } from "formik";
import * as yup from "yup";
import { FORM_VALIDATION } from "../utils/formValidation";
// internal
import ButtonWrapper from "./FormComponents/Button";
import TextField from "../forms/FormComponents/TextField";

const LOCAL_FORM_VALIDATION = yup.object().shape({
  old_password: FORM_VALIDATION["password"],
  password1: FORM_VALIDATION["password"],
  password2: FORM_VALIDATION["password"],
});
const FORM_INITIAL_VALUES = {
  old_password: "",
  password1: "",
  password2: "",
};

export default function UpdatePasswordForm(props: {
  updatePassword: (
    password: string,
    password1: string,
    oldpassword: string
  ) => void;
}) {
  const [open, setOpen] = useState(false);

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
        await props.updatePassword(
          values?.password1,
          values?.password2,
          values?.old_password
        );
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => {
        return (
          <Form>
            <div>
              <Button
                sx={{
                  color: "#2F7EC7",
                  fontSize: "14px",
                  fontWeight: "500",
                  textTransform: "none",
                }}
                onClick={handleClickOpen}
              >
                Update password
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <Paper
                  sx={{
                    width: "100%",
                    // height: "457px",
                  }}
                >
                  <DialogTitle
                    sx={{
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "#000000",
                      my: "18px",
                      textAlign: "center",
                    }}
                  >
                    Update Password
                  </DialogTitle>
                  <DialogContent>
                    <Stack
                      direction="column"
                      alignItems="flex-start"
                      spacing={3}
                    >
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
                          Old Password
                        </DialogContentText>
                        <TextField
                          name="old_password"
                          inputProps={{
                            style: {
                              padding: "10px",
                              fontSize: "16px",
                              color: "#0F0F0F",
                            },
                          }}
                          id="old-password"
                          type="password"
                          // value={oldPassword}
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
                          New Password
                        </DialogContentText>
                        <TextField
                          inputProps={{
                            style: {
                              padding: "10px",
                              fontSize: "16px",
                              color: "#0F0F0F",
                            },
                          }}
                          id="password1"
                          type="password"
                          // value={password1}
                          name="password1"
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
                          Confirm Password
                        </DialogContentText>
                        <TextField
                          inputProps={{
                            style: {
                              padding: "10px",
                              fontSize: "16px",
                              color: "#0F0F0F",
                            },
                          }}
                          id="password2"
                          type="password"
                          // value={password2}
                          name="password2"
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
                          sx={{
                            // maxHeight: "53px",
                            borderRadius: "4px",
                            mt: 0,
                            p: "8px 32px",
                          }}
                          disabled={!isValid || isSubmitting}
                        >
                          Save
                        </ButtonWrapper>
                      </Stack>
                    </Stack>
                  </DialogContent>
                </Paper>
              </Dialog>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
