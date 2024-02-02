//mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
//utility
import { getFieldComponentByType } from "../../page/ModelObject/utility";

function GetFieldComponent({
  fieldInfo,
  mode,
}: {
  fieldInfo: { [index: string]: any };
  mode: string;
}) {
  const ComponentByType = getFieldComponentByType(fieldInfo, mode);
  return (
    <Stack id="GetFieldComponent-container" mb="1rem" width="100%">
      <Typography
        fontWeight={400}
        color="text.grey"
        sx={{ width: "160px", wordWrap: "break-word", mr: ".8rem", mb: 1 }}
      >
        {fieldInfo?.fieldName?.charAt(0)?.toUpperCase() +
          fieldInfo?.fieldName?.substr(1)}
      </Typography>
      <ComponentByType name={fieldInfo?.fieldName} />
    </Stack>
  );
}

export default GetFieldComponent;
