import { useEffect, useState } from "preact/hooks";
import axios from "../axios";
//utility
import { httpErrorHandler } from "../utils/utility";

function useAxiosFunction() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState(null);

  const axiosFetch = async (configObj) => {
    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axios({ ...configObj, signal: ctrl?.signal });
      setResponse(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
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

  return [response, error, loading, axiosFetch];
}

export default useAxiosFunction;
