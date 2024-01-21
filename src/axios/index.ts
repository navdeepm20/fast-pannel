//axios
import axios from "axios";
//url
import urls from "../utils/urls.json";
import { getAuthToken } from "../utils/utility";

export const axiosInstance = axios.create({
  baseURL: urls?.baseUrl,
  headers: {
    Authorization: getAuthToken(),
  },
});

axiosInstance.interceptors.request.use(function (config) {
  const token = getAuthToken();
  config.headers.Authorization = token ? token : "";
  return config;
});
