//preact
import { useState, useEffect } from "preact/hooks";
//mui
import Paper from "@mui/material/Paper";
//hooks
import useAxios from "../../hooks/useAxios";
//internal
import Table from "../../components/table";
import Loader from "../../components/loading";
import PageHeading from "../../components/page_heading";
//utils
import urls from "../../utils/urls.json";
import { createCols, colsConfig, createRows } from "./utility";
//libs
import { useParams } from "react-router-dom";
import ErrorOccured from "../../components/error";
import { Typography } from "@mui/material";

function Model({ ...props }) {
  const { modelName, appName } = useParams();
  const [selectionModel, setSelectionModel] = useState([]);
  const [response, error, loading, refetch] = useAxios({
    url: `${urls?.model_get?.url}?app_name=${appName}&model_name=${modelName}`,
    method: urls?.model_get?.method,
  });
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (response) {
      setCols(createCols(response.data?.items?.[0], colsConfig));
      setRows(createRows(response?.data?.items), {});
    }
  }, [response]);

  return (
    <Paper elevation={0} sx={{ height: "100%" }} id="model-container">
      <PageHeading title="Select the Object to Change" />
      {loading ? (
        <Loader sx={{ height: "calc(100% - 85px)" }} />
      ) : (
        <>
          {error ? (
            <ErrorOccured />
          ) : (
            <Table
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
              rows={rows}
              columns={cols}
              handleRowClick={({ tableProps, navigate }) => {
                if (window.opener) {
                  window.opener.postMessage(tableProps?.row?.id, "*");
                  window.close();
                }
                navigate(`${tableProps?.id}/edit`);
              }}
            />
          )}
        </>
      )}
    </Paper>
  );
}
export default Model;
