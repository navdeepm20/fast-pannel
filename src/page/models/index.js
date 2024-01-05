import { useEffect, useState } from "preact/hooks";
// internal
import ErrorOccured from "../../components/error";
import Table from "../../components/table";
import Breadcrumbs from "../../components/breadcrumbs";
//mui
import Paper from "@mui/material/Paper";

//internal hooks
import useAxios from "../../hooks/useAxios";
//utils
import { createCols, colsConfig, createRows } from "./utils";
//utility
import urls from "../../utils/urls.json";
//libs
import { useParams } from "react-router-dom";
import Loader from "../../components/loading";

function Models({ ...props }) {
  const { appName } = useParams();
  const [response, error, loading, refetch] = useAxios({
    url: `${urls?.apps_get?.url}?app_name=${appName}`,
    method: urls?.apps_get?.method,
  });

  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // fetch data here
    if (response) {
      setCols(
        createCols(response.data[0]?.models, colsConfig, colsConfig, appName)
      );
      setRows(createRows(response.data[0]?.models));
    }
  }, [response]);
  return (
    <Paper elevation={0} sx={{ width: "100%", height: "100%" }}>
      <Breadcrumbs />
      {loading ? (
        <Loader sx={{ height: "calc(100% - 85px)" }} />
      ) : (
        <>
          {error ? (
            <ErrorOccured />
          ) : (
            <>
              <Table
                rows={rows}
                columns={cols}
                checkboxSelection={false}
                sx={{ maxWidth: "1000px" }}
              />
            </>
          )}
        </>
      )}
    </Paper>
  );
}

export default Models;
