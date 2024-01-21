//mui
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
//mui types
import { DialogProps } from "@mui/material/Dialog";
import { DialogContentProps } from "@mui/material/DialogContent";
import { DialogActionsProps } from "@mui/material/DialogActions";
import { DialogTitleProps } from "@mui/material/DialogTitle";

type DialogWrapperPropTypes = {
  dialogTitleChild?: React.ReactNode;
  dialogContentChild: React.ReactNode;
  dialogActionChild?: React.ReactNode;
  dialogProps: DialogProps;
  dialogTitleProps?: DialogTitleProps;
  dialogContentProps?: DialogContentProps;
  dialogActionProps?: DialogActionsProps;
};

function DialogWrapper({
  dialogTitleChild,
  dialogContentChild,
  dialogActionChild,
  dialogContentProps,
  dialogTitleProps,
  dialogActionProps,
  dialogProps,
}: DialogWrapperPropTypes) {
  // Extract and preserve sx values with default empty objects
  const { sx: dialogSx = {}, ...finalDialogProps } = dialogProps || {};
  const { sx: dialogContentSx = {}, ...finalDialogContentProps } =
    dialogContentProps || {};
  const { sx: dialogTitleSx = {}, ...finalDialogTitleProps } =
    dialogTitleProps || {};
  const { sx: dialogActionSx = {}, ...finalDialogActionProps } =
    dialogActionProps || {};

  return (
    <Dialog
      {...finalDialogProps}
      sx={{
        "& .MuiDialog-paper": { borderRadius: 1, p: "24px 32px" },
        backgroundColor: "rgba(9, 31, 51, 0.30)",
        backdropFilter: "blur(1px)",
        ...dialogSx,
      }}
    >
      {dialogTitleChild && (
        <DialogTitle
          {...finalDialogTitleProps}
          sx={{ mb: "8px", p: 0, ...dialogTitleSx }}
        >
          {dialogTitleChild}
        </DialogTitle>
      )}
      {dialogContentChild && (
        <DialogContent
          {...finalDialogContentProps}
          sx={{
            p: 0,
            mb: 3,
            ...dialogContentSx,
          }}
        >
          {dialogContentChild}
        </DialogContent>
      )}
      {dialogActionChild && (
        <DialogActions
          {...finalDialogActionProps}
          sx={{
            p: 0,
            display: "flex",
            justifyContent: "space-between",
            ...dialogActionSx,
          }}
        >
          {dialogActionChild}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default DialogWrapper;
