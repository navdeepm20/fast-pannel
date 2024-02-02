//mui
import Stack from "@mui/material/Stack";
//internal
import GetFieldComponent from "./GetFieldComponent";

function SingleObject({
  fieldInfo,
  mode,
}: {
  fieldInfo: { [index: string]: any };
  mode: string;
}) {
  return (
    <Stack direction="row" alignItems="center">
      <GetFieldComponent fieldInfo={fieldInfo} mode={mode} />
    </Stack>
  );
}

export default SingleObject;
