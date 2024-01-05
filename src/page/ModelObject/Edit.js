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
import { validateFormData, filterDataByChangedValue } from "./utility";
//internal hooks
import useAxios from "../../hooks/useAxios";
import useAxiosFunction from "../../hooks/useAxiosFunction";
//libs
import { useNavigate, useParams } from "react-router-dom";
import { notificationHandler } from "../../utils/utility";
import ErrorOccured from "../../components/error";
import DeleteConfirmationDialog from "../../components/dialogs/DeleteConfirmationDialog";
import Breadcrumbs from "../../components/breadcrumbs";

function ModelObjectEdit({ objectData, ...props }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const { modelName, appName, objectId } = useParams();
  const [fields, setFields] = useState([]);
  //for fetching model field types
  const [response, error, loading, refetch] = useAxios({
    url: `${urls?.model_objects_attribute_get?.url}?app_name=${appName}&model_name=${modelName}`,
    method: urls?.model_objects_attribute_get?.method,
  });
  const [modelObjData, setModelObjData] = useState({});
  const [fieldsWithValue, setFieldsWithValue] = useState([]);
  //for delete dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const handleDeleteDialogClose = (e) => {
    setIsDeleteDialogOpen(false);
  };
  //axios for fetching the model obj data
  const [modelObjResponse, modelObjError, modelObjLoading, modelObjRefetch] =
    useAxios({
      url: `${urls?.model_objects_get?.url}${objectId}?app_name=${appName}&model_name=${modelName}`,
      method: urls?.model_objects_get?.method,
    });
  //for submit & delete data
  const [apiResponse, apiError, apiLoading, axiosFetch] = useAxiosFunction();

  const formRef = useRef();
  //for catching the fields types response
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

  //for catching the fields data
  useEffect(() => {
    if (modelObjResponse) {
      setModelObjData(modelObjResponse.data);
    }
  }, [modelObjResponse]);

  //for creating fields with value
  useEffect(() => {
    if (Object.keys(modelObjData).length && fields?.length) {
      setFieldsWithValue((prev) => {
        return fields
          .map((fieldInfo) => {
            return {
              value: modelObjData[fieldInfo?.fieldName],
              ...fieldInfo,
            };
          })
          .filter((modelField, index) => {
            const field = Object.keys(modelField)[0];
            return field !== "id" && field !== "_id" && field !== "password";
          });
      });
    }
  }, [fields, modelObjData]);

  //for submitting form
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = validateFormData(formRef, fieldsWithValue);
    const filteredData = filterDataByChangedValue(data?.data, modelObjData);

    if (!data?.error) {
      axiosFetch({
        axiosInstance: axiosInstance,
        method: urls?.models_objects_patch?.method,
        url: `${urls?.models_objects_patch?.url}${objectId}`,
        data: {
          data: filteredData,
          app: appName,
          model: modelName,
        },
      });
    } else {
      notificationHandler({ severity: "error", title: data?.error });
    }
  };

  //for deleting object
  const handleDelete = (e) => {
    e.preventDefault();
    axiosFetch({
      axiosInstance: axiosInstance,
      method: urls?.models_objects_delete?.method,
      url: `${urls?.models_objects_delete?.url}${objectId}?app_name=${appName}&model_name=${modelName}`,
    });
  };

  useEffect(() => {
    if (apiResponse && apiResponse.status === 200) {
      notificationHandler({
        severity: "success",
        title: "Record Successfully Updated",
      });
      setModelObjData(apiResponse.data);
      // navigate(-1);
    }
    if (apiResponse && apiResponse.status === 204) {
      notificationHandler({
        severity: "success",
        title: "Record Successfully Deleted",
      });
      navigate(`/${appName}/models/${modelName}`);
    }
  }, [apiResponse]);
  return (
    <>
      {loading ? (
        <Loader sx={{ height: "calc(100% - 85px)" }} />
      ) : (
        <Paper elevation={0}>
          {/* <PageHeading title={`Edit ${modelName}`} /> */}
          <Breadcrumbs />
          {!modelObjError ? (
            <form ref={formRef}>
              <Box
                sx={{
                  p: "1rem",
                  borderRadius: "8px",
                  mt: ".5rem",
                }}
              >
                {fieldsWithValue.map((fieldInfo, index) => {
                  return (
                    <SingleObject
                      key={index}
                      fieldInfo={fieldInfo}
                      mode="edit"
                    />
                  );
                })}
              </Box>
              <Stack direction="row" gap={2}>
                <CustomButton disabled={apiLoading} onClick={handleSubmit}>
                  Save
                </CustomButton>
                <CustomButton
                  disabled={apiLoading}
                  onClick={() => setIsDeleteDialogOpen(true)}
                  sx={{
                    backgroundColor: "#D92D20",
                    ":hover": {
                      backgroundColor: "#b72418",
                    },
                  }}
                >
                  Delete
                </CustomButton>
              </Stack>
            </form>
          ) : (
            <ErrorOccured />
          )}
          <DeleteConfirmationDialog
            handleClose={handleDeleteDialogClose}
            handleDelete={handleDelete}
            open={isDeleteDialogOpen}
            isLoading={apiLoading}
          />
        </Paper>
      )}
    </>
  );
}

export default ModelObjectEdit;
