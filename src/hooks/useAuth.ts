import { useContext } from "preact/hooks";

//context
import { AuthContext } from "../context/AuthContext";

function useAuth() {
  const { user, dispatch } = useContext(AuthContext);
  return { user, dispatch };
}

export default useAuth;
