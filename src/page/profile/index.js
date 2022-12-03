//forms
import { useState, useEffect } from "preact/hooks";
import UpdateProfileForm from "../../forms/UpdateProfileForm";
//utils
import urls from "../../utils/urls.json";
//hooks internal
import useAxios from "../../hooks/useAxios";
import useAxiosFunction from "../../hooks/useAxiosFunction";
// axios
import axios from "../../axios";

function Profile({ ...props }) {
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
      axiosInstance: axios,
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
  useEffect(() => {
    if (apiResponse && apiResponse.status === 200) {
      setProfileData(apiResponse?.data?.data);
    }
  }, [apiResponse]);

  return (
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
  );
}

export default Profile;
