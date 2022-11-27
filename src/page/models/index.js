import { useEffect } from "preact/hooks";
// internal
import Table from "../../components/table";
import { CustomCellWithButton, CustomCellWithLinkText } from "./CustomCells";
//mui
import Paper from "@mui/material/Paper";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

//passing props custom cell
const CustomCellAdd = ({ ...props }) => {
  return (
    <CustomCellWithButton
      icon={<LibraryAddIcon />}
      title="Add"
      clickHandler={(e) => {
        console.log("handle add");
      }}
    />
  );
};
const CustomCellEdit = ({ ...props }) => {
  return (
    <CustomCellWithButton
      icon={<DriveFileRenameOutlineIcon />}
      title="Add"
      clickHandler={(e) => {
        console.log("handle edit");
      }}
    />
  );
};

const CustomModelLinkCell = ({ name, link, ...props }) => {
  return <CustomCellWithLinkText linkTo={link}>{name}</CustomCellWithLinkText>;
};
// dummy data
const cols = [
  {
    id: 0,
    field: "name",
    headerName: "Model Name",
    width: 250,
    renderCell: ({ ...props }) => {
      console.log(props?.row?.name);
      return (
        <CustomModelLinkCell
          link={`models/${props?.row?.name}`}
          name={props?.row?.name}
        />
      );
    },
  },
  {
    id: 0,
    field: "add",
    headerName: "Add Object",
    sortable: false,
    width: 150,
    renderCell: CustomCellAdd,
  },
  {
    id: 0,
    field: "edit",
    headerName: "Edit Object",
    sortable: false,
    width: 150,

    renderCell: CustomCellEdit,
  },
];
const rows = [
  {
    id: 0,
    name: "Model 1",
  },
];

function Models({ ...props }) {
  useEffect(() => {
    // fetch data here
  }, []);

  return (
    <Paper elevation={0}>
      <Table
        rows={rows}
        columns={cols}
        checkboxSelection={false}
        sx={{ maxWidth: "1000px" }}
      />
    </Paper>
  );
}

export default Models;
