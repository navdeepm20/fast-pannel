//mui
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

type fieldInfoType = {
  fieldName: string;
  bsonType: string;
  type?: string;
  description?: string;
  title?: string;
  relation_type: string;
  required?: string[];
  frozen?: boolean;
};
type propTypes = {
  mainField: React.ReactNode;
  [props: string]: any;
  fieldsInfo: fieldInfoType;
};
function ReferenceFieldForm({ mainField, fieldsInfo, ...props }: propTypes) {
  return (
    <Stack>
      <Stack direction="row">
        <Button>Add {fieldsInfo?.fieldName}</Button>
      </Stack>
    </Stack>
  );
}

export default ReferenceFieldForm;
