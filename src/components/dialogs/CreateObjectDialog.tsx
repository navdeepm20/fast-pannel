import DialogWrapper from "./DialogWrapper";
//mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
//internal
import CreateObjectForm from "../../forms/CreateObjectForm";

//Create dialog inner content
function CreateObjectDialogContent({
  handleClose,
}: {
  handleClose: () => void;
}) {
  return (
    <Stack>
      <CreateObjectForm />
    </Stack>
  );
}

//Create Dialog Types
type CreateObjectDialogTypes = {
  open: boolean;
  handleClose: () => void;
  isLoading: boolean;
};

function CreateObjectDialog({
  open,
  handleClose,
  isLoading,
}: CreateObjectDialogTypes) {
  return (
    <DialogWrapper
      dialogProps={{
        open,
        onClose: handleClose || (() => {}),
        fullWidth: true,
        maxWidth: "xs",
      }}
      dialogContentChild={
        <CreateObjectDialogContent handleClose={handleClose} />
      }
      // dialogActionChild={
      //   <DeleteConfirmationDialogActions
      //     handleDelete={handleDelete}
      //     isLoading={isLoading}
      //     handleClose={handleClose}
      //   />
      // }
      dialogContentProps={{ sx: { mb: 0 } }}
    />
  );
}

export default CreateObjectDialog;
