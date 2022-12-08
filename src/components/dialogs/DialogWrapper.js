import React from "react";
//mui
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

function DialogWrapper({
  dialogContentChild,
  dialogActionChild,
  dialogContentProps,
  dialogActionProps,
  dialogProps,
  ...props
}) {
  const dialogSx = dialogProps?.sx;
  const dialogContentSx = dialogContentProps?.sx;
  const dialogActionSx = dialogActionProps?.sx;

  // delete dialogProps?.sx;
  // delete dialogActionProps?.sx;
  // delete dialogContentProps?.sx;

  return (
    <Dialog
      // open={open}
      // onClose={handleClose}
      // fullWidth={true}
      // maxWidth={"sm"}
      {...dialogProps}
      sx={{ ".MuiPaper-root": { borderRadius: "12px" }, ...dialogSx }}
    >
      <DialogContent
        {...dialogContentProps}
        sx={{
          p: "32px",
          pb: "0px",
          borderRadius: "12px",
          mb: "40px",
          ...dialogContentSx,
        }}
      >
        {dialogContentChild}
      </DialogContent>
      <DialogActions
        {...dialogActionProps}
        sx={{
          px: "32px",
          pb: "32px",
          display: "flex",
          justifyContent: "space-between",
          ...dialogActionSx,
        }}
      >
        {dialogActionChild}
      </DialogActions>
    </Dialog>
  );
}

DialogWrapper.defaultProps = {
  dialogContents: <></>,
  dialogActions: <></>,
  dialogContentsStyle: {},
  dialogActionsStyles: {},
  dialogStyles: {},
};
export default DialogWrapper;
