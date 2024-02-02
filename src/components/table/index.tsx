import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
//libs
import { useNavigate } from "react-router-dom";
import { SxProps } from "@mui/material";

interface CustomDataGridProps {
  rows: [];
  columns: [];
  tableProps: {};
  handleRowClick: ({
    tableProps,
    navigate,
  }: {
    tableProps: { [index: string]: any };
    navigate: (path: string) => void;
  }) => void;
  tableContainerProps: {
    sx?: SxProps;
  };
  [props: string]: any;
}
export default function CustomDataGrid({
  rows,
  columns,
  tableProps,
  handleRowClick,
  tableContainerProps,
  ...props
}: CustomDataGridProps) {
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
CustomDataGrid.defaultProps = {
  handleRowClick: () => {},
};
