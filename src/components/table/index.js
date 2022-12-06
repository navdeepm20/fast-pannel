import Box from "@mui/material/Box";
import { DataGrid, GridRow } from "@mui/x-data-grid";
//libs
import { useNavigate } from "react-router-dom";
const handleRowClick = ({ tableProps, navigate }) => {
  navigate(`${tableProps?.id}/edit`);
};

export default function DataGridDemo({ rows, columns, tableProps, ...props }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        onRowClick={({ ...props }) =>
          handleRowClick({ tableProps: props, navigate: navigate })
        }
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        {...tableProps}
      />
    </Box>
  );
}
