//mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
//utility
import { getFieldComponentByType } from "../../page/ModelObject/utility";

function GetFieldComponent({ fieldName, fieldValue, ...props }) {
  const ComponentByType = getFieldComponentByType(fieldName, fieldValue);
  return (
    <Stack
      direction="row"
      alignItems="center"
      id="GetFieldComponent-container"
      mb="1rem"
    >
      <Typography
        fontSize="16px"
        fontWeight="400"
        color="text.grey"
        sx={{ width: "160px", wordWrap: "break-word", mr: ".8rem" }}
      >
        {fieldName}
      </Typography>
      <ComponentByType name={fieldName} />
    </Stack>
  );
}

export default GetFieldComponent;
