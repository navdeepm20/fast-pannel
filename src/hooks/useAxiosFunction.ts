import { useEffect, useState } from "preact/hooks";

import { axiosInstance } from "../axios";
//utility
import { httpErrorHandler } from "../utils/utility";
//axios types
import { AxiosError, AxiosResponse, AxiosRequestConfig, Axios } from "axios";

interface AxiosFetchType extends AxiosRequestConfig {
  axiosInstance: Axios;
}
interface UseAxiosTypes {
  disableErrorNotification?: boolean;
}

function useAxiosFunction({ disableErrorNotification }: UseAxiosTypes = {}) {
  const [mutationResponse, setMutationResponse] =
    useState<null | AxiosResponse>(null);
  const [mutationError, setMutationError] = useState<AxiosError | null>(null);
  const [mutationLoading, setMutationLoading] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);

  const axiosFetch = async (configObj: AxiosFetchType) => {
    try {
      setMutationLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance({ ...configObj, signal: ctrl?.signal });
      setMutationResponse(res);
    } catch (err: any) {
      setMutationError(err);
    } finally {
      setMutationLoading(false);
    }
  };

  useEffect(() => {
    // useEffect cleanup function
    return () => controller && controller?.abort();
  }, [controller]);

  useEffect(() => {
    if (mutationError && !disableErrorNotification) {
      httpErrorHandler(mutationError);
    }
  }, [mutationError]);

  return {
    mutationResponse,
    mutationError: mutationError as AxiosError,
    mutationLoading,
    axiosFetch,
  };
}

export default useAxiosFunction;
