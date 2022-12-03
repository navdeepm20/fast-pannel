// hooks
import useAuth from "../hooks/useAuth";
//libs
import { Navigate, Outlet } from "react-router-dom";
//urls
import urls from "../utils/urls.json";
function RoutesProtector({ children, ...props }) {
  const [user] = useAuth();
  console.log(user);
  return (
    <>{user?.isAuthenticated ? <Outlet /> : <Navigate to={urls?.signin} />}</>
  );
}

export default RoutesProtector;
