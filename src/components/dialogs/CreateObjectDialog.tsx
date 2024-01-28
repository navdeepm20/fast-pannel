//mui
import DialogWrapper from "./DialogWrapper";

//internal
import CreateObjectForm from "../../forms/CreateObjectForm";

//Create dialog inner content
function CreateObjectDialogContent() {
  return <CreateObjectForm />;
}

//Create Dialog Types
type CreateObjectDialogTypes = {
  open: boolean;
  handleClose: () => void;
  isLoading?: boolean;
};

function CreateObjectDialog({ open, handleClose }: CreateObjectDialogTypes) {
  return (
    <DialogWrapper
      dialogProps={{
        open,
        onClose: handleClose || (() => {}),
        fullWidth: true,
        maxWidth: "xs",
      }}
      dialogContentChild={<CreateObjectDialogContent />}
      dialogContentProps={{ sx: { mb: 0 } }}
    />
  );
}

export default CreateObjectDialog;
