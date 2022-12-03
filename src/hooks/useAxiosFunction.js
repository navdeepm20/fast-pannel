import { useEffect, useState } from "preact/hooks";
import axios from "../axios";
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // useEffect cleanup function
    return () => controller && controller?.abort();
  }, [controller]);

  return [response, error, loading, axiosFetch];
}

export default useAxiosFunction;
