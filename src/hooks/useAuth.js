import { useContext } from "preact/hooks";

//context
import { AuthContext } from "../context/AuthContext";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
