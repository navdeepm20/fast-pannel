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
import TableAction from "../../components/table_action";
import BlockingLoader from "../../components/BlockingLoader";
//utils
import urls from "../../utils/urls.json";
import { createCols, colsConfig, createRows } from "./utility";
//libs
import { useNavigate, useParams } from "react-router-dom";
import ErrorOccured from "../../components/error";
//custom axios

import { axiosInstance } from "../../axios";
import { httpErrorHandler, notificationHandler } from "../../utils/utility";

const deleteObject = async (objectId, appName, modelName) => {
  try {
    const response = await axiosInstance({
      method: urls?.models_objects_delete?.method,
      url: urls?.models_objects_delete?.url,
      data: {
        object_id: objectId,
        app_name: appName,
        model_name: modelName,
      },
    });
  } catch (error) {
    httpErrorHandler(error);
  }
};
function Model({ ...props }) {
  const { modelName, appName } = useParams();
  const [selected, setSelected] = useState([]);
  const [response, error, loading, refetch] = useAxios({
    url: `${urls?.model_get?.url}?app_name=${appName}&model_name=${modelName}`,
    method: urls?.model_get?.method,
  });
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  //for actions
  const [isPerformingAction, setIsPerformingAction] = useState(false);
  const handleDelete = async (e) => {
    setIsPerformingAction(true);
    for (let object = 0; object < selected.length; object++) {
      await deleteObject(selected[object], appName, modelName);
    }
    setIsPerformingAction(false);
    notificationHandler({
      severity: "success",
      title: "Operation Successfully Executed",
    });
    navigate(`/apps/${appName}`);
  };
  //reaction on after response
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
            <>
              <TableAction
                selected={selected}
                handleDelete={handleDelete}
                addObjectPageLink="add"
              />
              <Table
                onSelectionModelChange={(newSelectionModel) => {
                  setSelected(newSelectionModel);
                }}
                selectionModel={selected}
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
            </>
          )}
        </>
      )}
      <BlockingLoader
        show={isPerformingAction}
        message="Performing Action..."
      />
    </Paper>
  );
}
export default Model;
