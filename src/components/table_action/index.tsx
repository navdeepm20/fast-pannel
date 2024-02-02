//preact
import { useState } from "preact/hooks";
//mui
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
//internal
import CustomButton from "../../components/utility/Btn";

function TableAction({
  selected,
  handleDelete,
  handleAddClick,
}: {
  selected: [];
  handleDelete: () => void;
  handleAddClick: () => void;
}) {
  //action
  const [action, setAction] = useState("");

  const handleActionChange = (event: Event) => {
    setAction((event.target as HTMLInputElement).value);
  };

  return (
    <Paper
      elevation={0}
      id="action-container"
      sx={{
        border: "1px solid rgba(224, 224, 224, 1)",
        borderRadius: "4px",
        py: ".5rem",
        px: ".5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: ".5rem",
      }}
    >
      <Box>
        <FormControl sx={{ minWidth: "300px" }}>
          <Select
            sx={{
              ".MuiSelect-select": {
                py: "8px",
                px: "4px",
              },
            }}
            labelId="delete-records"
            id="delete-records"
            value={action}
            onChange={handleActionChange}
          >
            <MenuItem value="delete">Delete Records</MenuItem>
          </Select>
        </FormControl>
        <CustomButton
          disabled={action === "" || !selected?.length}
          disableElevation
          sx={{ ml: "1rem" }}
          onClick={handleDelete}
        >
          Go
        </CustomButton>
      </Box>

      <CustomButton
        sx={{ ml: "1rem" }}
        onClick={handleAddClick}
        startIcon={<AddToPhotosIcon />}
      >
        Add
      </CustomButton>
    </Paper>
  );
}

export default TableAction;
