//internal
import DialogWrapper from "./DialogWrapper";
import CustomButton from "../utility/Btn";
import SvgWrapper from "../svg";
//mui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const LogoutConfirmationDialogContent = ({ handleClose, ...props }) => {
  return (
    <Stack justifyContent="center" alignItems="center" width="100%">
      <Box>
        <Typography
          sx={{
            fontSize: "20px",
            lineHeight: "28px",
            fontWeight: "500",
            color: "#101828",
            textAlign: "center",
            mb: "8px",
          }}
        >
          Logout
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            lineHeight: "20px",
            fontWeight: "400",
            color: " #667085",
            textAlign: "center",
            mb: "32px",
          }}
        >
          Are you sure you want to Logout?
        </Typography>
      </Box>
    </Stack>
  );
};
const LogoutConfirmationDialogActions = ({
  handleClose,
  handleLogout,
  isLoading,
  ...props
}) => {
  return (
    <Stack direction="row" justifyContent="center" width="100%">
      <CustomButton
        sx={{
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "24px",
          mr: "12px",
          py: "10px",
          borderRadius: "8px",
          width: "300px",
          maxWidth: "352px",
        }}
        onClick={handleClose}
      >
        Cancel
      </CustomButton>
      <CustomButton
        sx={{
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "24px",
          py: "10px",
          borderRadius: "8px",
          width: "300px",
          maxWidth: "352px",
          backgroundColor: "#d32f2f",
          ":hover": {
            backgroundColor: "#b72418",
          },
          width: "300px",
          maxWidth: "352px",
        }}
        onClick={handleLogout}
        disabled={isLoading}
      >
        Logout
      </CustomButton>
    </Stack>
  );
};
function LogoutConfirmationDialog({
  open,
  handleClose,
  handleLogout,
  isLoading,

  ...props
}) {
  return (
    <DialogWrapper
      dialogProps={{
        open,
        onClose: () => {},
        fullWidth: true,
        maxWidth: "xs",
      }}
      dialogContentChild={
        <LogoutConfirmationDialogContent handleClose={handleClose} />
      }
      dialogActionChild={
        <LogoutConfirmationDialogActions
          handleLogout={handleLogout}
          isLoading={isLoading}
          handleClose={handleClose}
        />
      }
      dialogContentProps={{ sx: { mb: 0 } }}
    />
  );
}

export default LogoutConfirmationDialog;
