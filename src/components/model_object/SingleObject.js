//mui
import Stack from "@mui/material/Stack";
//internal
import GetFieldComponent from "./GetFieldComponent";

function SingleObject({ fieldName, fieldValue, mode, ...props }) {
  return (
    <Stack direction="row" alignItems="center">
      <GetFieldComponent
        fieldName={fieldName}
        fieldValue={fieldValue}
        mode={mode}
      />
    </Stack>
  );
}

export default SingleObject;
