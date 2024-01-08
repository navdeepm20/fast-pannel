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
//internal hooks
import useAxios from "../../hooks/useAxios";
import useAxiosFunction from "../../hooks/useAxiosFunction";
//libs
import { useParams } from "react-router-dom";

function ModelObject({ objectData, ...props }) {
  const { modelName, appName } = useParams();
  const [fields, setFields] = useState([]);
  const [response, error, loading, refetch] = useAxios({
    url: `${urls?.model_objects_attribute?.url}?app_name=${appName}&model_name=${modelName}`,
    method: urls?.model_get?.method,
  });
  const [apiResponse, apiError, apiLoading, axiosFetch] = useAxiosFunction();
  const formRef = useRef();
  useEffect(() => {
    if (response) {
      setFields(response.data);
    }
  }, [response]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {};
    fields.map((field) => {
      const fieldName = Object.keys(field)[0];
      if (formRef.current.elements[fieldName]?.type === "checkbox") {
        if (formRef.current.elements[fieldName]?.checked !== "on") {
          data[fieldName] = formRef.current.elements[fieldName].checked;
        } else {
          data[fieldName] = false;
        }
      } else {
        data[fieldName] = formRef.current.elements[fieldName].value;
      }
    });
    axiosFetch({
      axiosInstance: axiosInstance,
      method: urls?.models_objects_patch?.method,
      url: urls?.models_objects_patch?.url,
      data: {
        data: data,
        app: appName,
        model: modelName,
      },
    });
  };

  return (
    <>
      {loading ? (
        <Loader sx={{ height: "calc(100% - 85px)" }} />
      ) : (
        <Paper elevation={0}>
          <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
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
                  />
                );
              })}
            </Box>
            <Stack direction="row" gap={2}>
              <CustomButton type="submit" disabled={apiLoading}>
                Create
              </CustomButton>
            </Stack>
          </form>
        </Paper>
      )}
    </>
  );
}

export default ModelObject;
