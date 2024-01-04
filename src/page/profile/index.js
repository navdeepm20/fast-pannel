//react
import { useState, useEffect } from "preact/hooks";
//forms
import UpdateProfileForm from "../../forms/UpdateProfileForm";
//utils
import urls from "../../utils/urls.json";
//internal
import Loader from "../../components/loading";
import ErrorOccured from "../../components/error";
//hooks internal
import useAxios from "../../hooks/useAxios";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import useAuth from "../../hooks/useAuth";
// axios
import { axiosInstance } from "../../axios";
//utility
import { notificationHandler } from "../../utils/utility";
import Breadcrumbs from "../../components/breadcrumbs";
//mui
import Paper from "@mui/material/Paper";

function Profile({ ...props }) {
  const [, dispatch] = useAuth();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [response, error, loading] = useAxios({
    url:
      urls.model_objects_get?.url +
      userInfo?._id +
      `?app_name=fastpanel.core.accounts&model_name=fastpaneluser`,
    method: urls?.model_objects_get?.method,
  });
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    if (response && response.status === 200) {
      setProfileData(response?.data);
    }
  }, [response]);

  const [apiResponse, apiError, apiLoading, axiosFetch] = useAxiosFunction();
  const handleUpdateProfile = async ({
    first_name,
    username,
    last_name,
    email,
  }) => {
    axiosFetch({
      axiosInstance: axiosInstance,
      method: urls?.models_objects_patch?.method,
      url: `${urls?.models_objects_patch?.url}${userInfo?._id}`,
      data: {
        data: {
          username,
          first_name,
          last_name,
          email,
        },
        app_name: "fastpanel.core.accounts",
        model_name: "fastpaneluser",
      },
    });
  };
  //will be triggered when apiresponse comes
  useEffect(() => {
    if (apiResponse && apiResponse.status === 200) {
      setProfileData(apiResponse?.data);
      dispatch({
        type: "update_user",
        payload: {
          user: apiResponse?.data,
        },
      });
      notificationHandler({
        severity: "success",
        title: "Profile Updated Successfully",
      });
    }
  }, [apiResponse]);

  return (
    <Paper elevation={0}>
      {loading ? (
        <Loader sx={{ height: "calc(100% - 85px)" }} />
      ) : (
        <>
          {error ? (
            <ErrorOccured />
          ) : (
            <>
              <Breadcrumbs />
              <UpdateProfileForm
                firstName={profileData?.first_name}
                lastName={profileData?.last_name}
                username={profileData?.username}
                email={profileData?.email}
                loading={loading}
                updateProfile={handleUpdateProfile}
                createdOn={profileData?.date_joined}
                lastLogin={profileData?.last_login}
              />
            </>
          )}
        </>
      )}
    </Paper>
  );
}

export default Profile;
