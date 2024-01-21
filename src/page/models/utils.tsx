//passing props custom cell
import { CustomCellWithButton, CustomCellWithLinkText } from "./CustomCells";
//mui
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
//libs
import { useNavigate } from "react-router-dom";
const CustomCellAdd = ({ linkTo, ...props }) => {
  const navigate = useNavigate();
  return (
    <CustomCellWithButton
      icon={<LibraryAddIcon />}
      title="Add"
      clickHandler={(e) => {
        navigate(linkTo);
      }}
    />
  );
};

const CustomCellEdit = ({ linkTo, ...props }) => {
  const navigate = useNavigate();
  return (
    <CustomCellWithButton
      icon={<DriveFileRenameOutlineIcon />}
      title="Edit"
      clickHandler={(e) => {
        navigate(linkTo);
      }}
    />
  );
};

const CustomModelLinkCell = ({ name, link, ...props }) => {
  return <CustomCellWithLinkText linkTo={link}>{name}</CustomCellWithLinkText>;
};

export const createCols = (cols, fieldConfig) => {
  let customCols = [
    {
      name: "add",
    },
    {
      name: "edit",
    },
  ];

  Object.keys(cols[0]).map((col) => {
    if (col !== "import_path") {
      customCols.unshift({
        name: col,
      });
    }
  });

  if (cols) {
    return customCols.map((col, ind) => {
      if (fieldConfig[col?.name]) {
        return {
          field: col.name,
          ...fieldConfig[col?.name],
        };
      } else {
        return {
          field: col.name,
        };
      }
    });
  }
  return [];
};
export const createRows = (rows, rowsConfig, appName) => {
  if (rows) {
    return rows?.map((row, ind) => {
      return {
        id: ind,
        ...row,
      };
    });
  }
  return [];
};
export const colsConfig = {
  name: {
    field: "Model Name",
    headerName: "Model Name",
    flex: 1,
    renderCell: ({ ...props }) => {
      return (
        <CustomModelLinkCell
          link={`${props?.row?.name}`}
          name={props?.row?.name}
        />
      );
    },
  },
  add: {
    headerName: "Add Object",
    sortable: false,
    flex: 1,
    renderCell: ({ ...props }) => {
      return <CustomCellAdd linkTo={`${props?.row?.name}/add`} />;
    },
  },
  edit: {
    headerName: "Edit Object",
    sortable: false,
    flex: 1,
    renderCell: ({ ...props }) => {
      return <CustomCellEdit linkTo={`${props?.row?.name}`} />;
    },
  },
};
