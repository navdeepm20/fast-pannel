//preact
import { useEffect, useState } from "preact/hooks";
//utility
import { httpErrorHandler } from "../utils/utility";

import { axiosInstance } from "../axios";
function useAxios(configObj) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  const refetch = () => setReload((prev) => prev + 1);
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axiosInstance({
          ...configObj,
          signal: controller?.signal,
        });
        setResponse(res);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // call the function
    fetchData();

    // useEffect cleanup function
    return () => controller.abort();

    // eslint-disable-next-line
  }, [reload]);
  useEffect(() => {
    if (error) {
      httpErrorHandler(error);
    }
  }, [error]);

  return [response, error, loading, refetch];
}

export default useAxios;
