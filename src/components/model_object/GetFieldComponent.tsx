//mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
//utility
import { getFieldComponentByType } from "../../page/ModelObject/utility";

function GetFieldComponent({ fieldInfo, mode, ...props }) {
  const ComponentByType = getFieldComponentByType(fieldInfo, mode);
  return (
    <Stack direction="row" id="GetFieldComponent-container" mb="1rem">
      <Typography
        fontSize="16px"
        fontWeight="400"
        color="text.grey"
        sx={{ width: "160px", wordWrap: "break-word", mr: ".8rem" }}
      >
        {fieldInfo?.fieldName?.charAt(0)?.toUpperCase() +
          fieldInfo?.fieldName?.substr(1)}
      </Typography>
      <ComponentByType name={fieldInfo?.fieldName} />
    </Stack>
  );
}

export default GetFieldComponent;
