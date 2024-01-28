//preact
import { useEffect, useState } from "preact/hooks";
//utility
import { httpErrorHandler } from "../utils/utility";
import { axiosInstance } from "../axios";
//types
import { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

function useAxios(configObj: AxiosRequestConfig) {
  const [response, setResponse] = useState<null | AxiosResponse>(null);
  const [error, setError] = useState<null | AxiosError>(null);
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
      } catch (error) {
        setError(error as AxiosError);
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

  return { response, error, loading, refetch };
}

export default useAxios;
