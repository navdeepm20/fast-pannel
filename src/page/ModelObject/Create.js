//preact
import { useEffect, useState, useRef } from "preact/hooks";
//mui
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";

//internal
import PageHeading from "../../components/page_heading";
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
  const theme = useTheme();
  const { modelName, appName } = useParams();
  const [fields, setFields] = useState([]);
  const [response, error, loading, refetch] = useAxios({
    url: `${urls?.model_objects_attribute_get?.url}?app_name=${appName}&model_name=${modelName}`,
    method: urls?.model_objects_attribute_get?.method,
  });
  const [apiResponse, apiError, apiLoading, axiosFetch] = useAxiosFunction();
  const formRef = useRef();
  useEffect(() => {
    if (response) {
      setFields(
        response.data?.filter((modelField, index) => {
          const field = Object.keys(modelField)[0];
          return field !== "id" && field !== "_id";
        })
      );
    }
  }, [response]);

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
          app_name: appName,
          model_name: modelName,
        },
      });
    } else {
      notificationHandler({ severity: "error", title: data?.error });
    }
  };

  useEffect(() => {
    if (apiResponse && apiResponse.status === 200) {
      notificationHandler({
        severity: "success",
        title: "Record Successfully Added",
      });
    }
  }, [apiResponse]);

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
          <PageHeading title={`Add ${modelName}`} />
          {error ? (
            <ErrorOccured />
          ) : (
            <form ref={formRef}>
              <Box
                sx={{
                  p: "1rem",
                  borderRadius: "8px",
                  mt: ".5rem",
                }}
              >
                {fields.map((field, index) => {
                  const fieldName = Object.keys(field)[0];
                  return (
                    <SingleObject
                      fieldName={fieldName}
                      fieldValue={field[fieldName]}
                      mode="create"
                    />
                  );
                })}
              </Box>
              <Stack direction="row" gap={2}>
                <CustomButton disabled={apiLoading} onClick={handleSubmit}>
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
