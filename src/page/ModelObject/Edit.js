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
import axios from "../../axios";
//utils
import urls from "../../utils/urls.json";
import { validateFormData, filterDataByChangedValue } from "./utility";
//internal hooks
import useAxios from "../../hooks/useAxios";
import useAxiosFunction from "../../hooks/useAxiosFunction";
//libs
import { useParams } from "react-router-dom";
import { notificationHandler } from "../../utils/utility";

function ModelObjectEdit({ objectData, ...props }) {
  const theme = useTheme();
  const { modelName, appName, objectId } = useParams();
  const [fields, setFields] = useState([]);
  //for fetching model field types
  const [response, error, loading, refetch] = useAxios({
    url: `${urls?.model_objects_attribute_get?.url}?app_name=${appName}&model_name=${modelName}`,
    method: urls?.model_objects_attribute_get?.method,
  });
  const [modelObjData, setModelObjData] = useState({});
  const [fieldsWithValue, setFieldsWithValue] = useState([]);
  //axios for fetching the model obj data
  const [modelObjResponse, modelObjError, modelObjLoading, modelObjRefetch] =
    useAxios({
      url: `${urls?.model_objects_get?.url}${objectId}?app_name=${appName}&model_name=${modelName}`,
      method: urls?.model_objects_get?.method,
    });
  //for submit data
  const [apiResponse, apiError, apiLoading, axiosFetch] = useAxiosFunction();

  const formRef = useRef();
  //for catching the fields types response
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

  //for catching the fields data
  useEffect(() => {
    if (modelObjResponse) {
      setModelObjData(modelObjResponse.data);
    }
  }, [modelObjResponse]);

  useEffect(() => {
    if (Object.keys(modelObjData).length && fields?.length) {
      setFieldsWithValue((prev) => {
        const fieldsWithValue = response?.data?.map((field) => {
          const fieldName = Object.keys(field)[0];
          return {
            [fieldName]: {
              value: modelObjData[fieldName],
              ...field[fieldName],
            },
          };
        });
        return fieldsWithValue.filter((modelField, index) => {
          const field = Object.keys(modelField)[0];
          return field !== "id" && field !== "_id" && field !== "password";
        });
      });
    }
  }, [fields, modelObjData]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = validateFormData(formRef, fieldsWithValue);
    const filtereData = filterDataByChangedValue(data?.data, modelObjData);
    if (!data?.error) {
      axiosFetch({
        axiosInstance: axios,
        method: urls?.models_objects_patch?.method,
        url: urls?.models_objects_patch?.url,
        data: {
          object_id: objectId,
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
  console.log("asdfadsfadsfadsfadsfadfadfadfadsfadsfadfadf");
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Paper elevation={0}>
          <PageHeading title={`Edit ${modelName}`} />
          <form ref={formRef}>
            <Box
              sx={{
                p: "1rem",
                borderRadius: "8px",
                mt: ".5rem",
              }}
            >
              {fieldsWithValue.map((field, index) => {
                const fieldName = Object.keys(field)[0];
                return (
                  <SingleObject
                    key={index}
                    fieldName={fieldName}
                    fieldValue={field[fieldName]}
                  />
                );
              })}
            </Box>
            <Stack direction="row" gap={2}>
              <CustomButton disabled={apiLoading} onClick={handleSubmit}>
                Save
              </CustomButton>
              <CustomButton disabled={apiLoading} onClick={handleSubmit}>
                Delete
              </CustomButton>
            </Stack>
          </form>
        </Paper>
      )}
    </>
  );
}

export default ModelObjectEdit;
