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

//mui
import Paper from "@mui/material/Paper";

export interface UserProfileDataType {
  first_name: string;
  username: string;
  last_name: string;
  email: string;
  date_joined: string;
  last_login: string;
}
function Profile() {
  const { dispatch } = useAuth();
  const userInfo = JSON.parse(localStorage.getItem("user") || "");
  const { response, error, loading } = useAxios({
    url:
      urls.model_objects_get?.url +
      userInfo?._id +
      `?app_name=fastpanel.core.accounts&model_name=fastpaneluser`,
    method: urls?.model_objects_get?.method,
  });
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    date_joined: "",
    last_login: "",
  });

  useEffect(() => {
    if (response && response.status === 200) {
      setProfileData(response?.data);
    }
  }, [response]);

  const { mutationResponse, mutationLoading, axiosFetch } = useAxiosFunction();
  const handleUpdateProfile = async ({
    first_name,
    username,
    last_name,
    email,
  }: {
    first_name: string;
    username: string;
    last_name: string;
    email: string;
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
  //will be triggered when mutationResponse comes
  useEffect(() => {
    if (mutationResponse && mutationResponse.status === 200) {
      setProfileData(mutationResponse?.data);
      dispatch({
        type: "update_user",
        payload: {
          user: mutationResponse?.data,
        },
      });
      notificationHandler({
        severity: "success",
        title: "Profile Updated Successfully",
      });
    }
  }, [mutationResponse]);

  return (
    <Paper elevation={0} sx={{ height: "100%" }}>
      {loading ? (
        <Loader sx={{ height: "calc(100% - 85px)" }} />
      ) : (
        <>
          {error ? (
            <ErrorOccured />
          ) : (
            <>
              <UpdateProfileForm
                firstName={profileData?.first_name}
                lastName={profileData?.last_name}
                username={profileData?.username}
                email={profileData?.email}
                loading={loading || mutationLoading}
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
