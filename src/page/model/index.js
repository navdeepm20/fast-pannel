//preact
import { useState, useEffect } from "preact/hooks";
//mui
import Paper from "@mui/material/Paper";
//hooks
import useAxios from "../../hooks/useAxios";
//internal
import Table from "../../components/table";
//utils
import urls from "../../utils/urls.json";
import { getAuthToken } from "../../utils/utility";
import { createCols, colsConfig, createRows } from "./utility";
//libs
import { useParams } from "react-router-dom";

//dummy_data

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    // editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    // editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    // editable: true,
  },
];

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: 35,
  },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function Model({ ...props }) {
  const { modelName, appName } = useParams();
  const [selectionModel, setSelectionModel] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [response, error, loading, refetch] = useAxios({
    url: `${urls?.model_get?.url}?app_name=${appName}&model_name=${modelName}`,
    method: urls?.model_get?.method,
  });
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (response) {
      setModelData(response.data?.items);
      console.log(response?.data);
      setCols(createCols(response.data?.items?.[0], colsConfig));
      setRows(createRows(response?.data?.items), {});
      console.log(response.data);
    }
  }, [response]);
  return (
    <Paper elevation={0} width="100%">
      <Table
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        rows={rows}
        columns={cols}
      />
    </Paper>
  );
}
export default Model;
