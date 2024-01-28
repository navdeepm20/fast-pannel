import { useEffect, useState } from "preact/hooks";

import { axiosInstance } from "../axios";
//utility
import { httpErrorHandler } from "../utils/utility";
//axios types
import { AxiosError, AxiosResponse, AxiosRequestConfig, Axios } from "axios";

interface AxiosFetchType extends AxiosRequestConfig {
  axiosInstance: Axios;
}
function useAxiosFunction() {
  const [mutationResponse, setMutationResponse] =
    useState<null | AxiosResponse>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [mutationLoading, setMutationLoading] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);

  const axiosFetch = async (configObj: AxiosFetchType) => {
    console.log(configObj);
    try {
      setMutationLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance({ ...configObj, signal: ctrl?.signal });
      setMutationResponse(res);
    } catch (err: any) {
      setError(err);
    } finally {
      setMutationLoading(false);
    }
  };

  useEffect(() => {
    // useEffect cleanup function
    return () => controller && controller?.abort();
  }, [controller]);

  useEffect(() => {
    if (error) {
      httpErrorHandler(error);
    }
  }, [error]);

  return { mutationResponse, error, mutationLoading, axiosFetch };
}

export default useAxiosFunction;
