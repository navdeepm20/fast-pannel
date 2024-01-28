//preact
import { useEffect, useState, useRef } from "preact/hooks";
//mui
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";

//internal

import CustomButton from "../../components/utility/Btn";
import SingleObject from "../../components/model_object/SingleObject";
import Loader from "../../components/loading";
//axios
import { axiosInstance } from "../../axios";
//utils
import urls from "../../utils/urls.json";
import { validateFormData } from "./utility";
//internal hooks
import useAxios from "../../hooks/useAxios";
import useAxiosFunction from "../../hooks/useAxiosFunction";
//libs
import { useParams } from "react-router-dom";
import { notificationHandler } from "../../utils/utility";
import ErrorOccured from "../../components/error";

function ModelObjectCreate({ objectData, ...props }) {
  const { modelName, appName } = useParams();
  const [fields, setFields] = useState([]);
  const { response, error, loading, refetch } = useAxios({
    url: `${urls?.model_objects_attribute_get?.url}?app_name=${appName}&model_name=${modelName}`,
    method: urls?.model_objects_attribute_get?.method,
  });
  const { apiResponse, mutationLoading, axiosFetch } = useAxiosFunction();
  const formRef = useRef();

  useEffect(() => {
    if (response && Object.keys(response?.data?.properties).length > 0) {
      setFields(
        Object.entries(response.data?.properties)
          .map(([key, value]) => {
            return { fieldName: key, ...value };
          })
          .filter(
            (value) => value?.fieldName !== "id" && value?.fieldName !== "_id"
          )
      );
    }
  }, [response]);

  useEffect(() => {
    if (apiResponse && apiResponse.status === 200) {
      notificationHandler({
        severity: "success",
        title: "Record Successfully Added",
      });
    }
  }, [apiResponse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = validateFormData(formRef, fields);

    if (!data?.error) {
      axiosFetch({
        axiosInstance: axiosInstance,
        method: urls?.models_objects_post?.method,
        url: urls?.models_objects_post?.url,
        data: {
          data: data?.data,
          app: appName,
          model: modelName,
        },
      });
    } else {
      notificationHandler({ severity: "error", title: data?.error });
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{ width: "100%", height: "100%" }}
      id="Create-Container"
    >
      {loading ? (
        <Loader sx={{ height: "calc(100% - 85px)" }} />
      ) : (
        <Paper elevation={0}>
          {error ? (
            <ErrorOccured />
          ) : (
            <form ref={formRef}>
              <Box
                sx={{
                  borderRadius: "8px",
                  mt: ".5rem",
                }}
              >
                {fields.map((field, index) => {
                  return <SingleObject fieldInfo={field} mode="create" />;
                })}
              </Box>
              <Stack direction="row" gap={2}>
                <CustomButton disabled={mutationLoading} onClick={handleSubmit}>
                  Create
                </CustomButton>
              </Stack>
            </form>
          )}
        </Paper>
      )}
    </Paper>
  );
}

export default ModelObjectCreate;
