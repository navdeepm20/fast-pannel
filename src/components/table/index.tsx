import Box from "@mui/material/Box";
import { DataGrid, GridRow } from "@mui/x-data-grid";
//libs
import { useNavigate } from "react-router-dom";

export default function DataGridDemo({
  rows,
  columns,
  tableProps,
  handleRowClick,
  tableContainerProps,
  ...props
}) {
  const navigate = useNavigate();
  const tableContainerSx = tableContainerProps?.sx;
  delete tableContainerProps?.sx;
  return (
    <Box
      sx={{ height: 400, width: "100%", ...tableContainerSx }}
      {...tableContainerProps}
    >
      <DataGrid
        onRowClick={({ ...props }) =>
          handleRowClick({ tableProps: props, navigate: navigate })
        }
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={true}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        {...props}
      />
    </Box>
  );
}
DataGridDemo.defaultProps = {
  handleRowClick: () => {},
};
