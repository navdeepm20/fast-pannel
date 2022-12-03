//axios
import axios from "axios";
//url
import urls from "../utils/urls.json";
import { getAuthToken } from "../utils/utility";

export default axios.create({
  baseURL: urls?.baseUrl,
  headers: {
    Authorization: getAuthToken(),
  },
});
