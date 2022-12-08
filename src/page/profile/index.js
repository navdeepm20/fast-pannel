//forms
import { useState, useEffect } from "preact/hooks";
import UpdateProfileForm from "../../forms/UpdateProfileForm";
//utils
import urls from "../../utils/urls.json";
//internal
import Loader from "../../components/loading";
//hooks internal

import PageHeading from "../../components/page_heading";
import useAxios from "../../hooks/useAxios";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import useAuth from "../../hooks/useAuth";
// axios
import { axiosInstance } from "../../axios";
import ErrorOccured from "../../components/error";
import { notificationHandler } from "../../utils/utility";
import { Paper } from "@mui/material";

function Profile({ ...props }) {
  const [, dispatch] = useAuth();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [response, error, loading, refetch] = useAxios({
    url:
      urls.model_objects_get?.url +
      userInfo?._id +
      `?app_name=core&model_name=fastpaneluser`,
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
      url: urls?.models_objects_patch?.url,
      data: {
        object_id: userInfo?._id,
        data: {
          username,
          first_name,
          last_name,
          email,
        },
        app_name: "core",
        model_name: "fastpaneluser",
      },
    });
  };
  //will be triggered when apiresponse comes
  useEffect(() => {
    if (apiResponse && apiResponse.status === 200) {
      setProfileData(apiResponse?.data?.data);
      dispatch({
        type: "update_user",
        payload: {
          user: apiResponse?.data?.data,
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
      <PageHeading title="User Profile" />
      {loading ? (
        <Loader sx={{ height: "calc(100% - 85px)" }} />
      ) : (
        <>
          {error ? (
            <ErrorOccured />
          ) : (
            <UpdateProfileForm
              firstName={profileData?.first_name}
              lastName={profileData?.last_name}
              username={profileData?.username}
              email={profileData?.email}
              loading={loading}
              updateProfile={handleUpdateProfile}
              created_on={profileData?.date_joined}
              last_login={profileData?.last_login}
            />
          )}
        </>
      )}
    </Paper>
  );
}

export default Profile;
