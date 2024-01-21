import { useContext } from "preact/hooks";
import { globalContext } from "../context/GlobalContext";
function useGlobalContext() {
  return useContext(globalContext);
}
export default useGlobalContext;
