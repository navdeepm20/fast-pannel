// hooks
import useAuth from "../hooks/useAuth";
//libs
import { Navigate, Outlet } from "react-router-dom";
//urls
import { appRoutes } from "../utils/appRoutes";

function RoutesProtector({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return (
    <>{user.isAuthenticated ? <Outlet /> : <Navigate to={appRoutes.login} />}</>
  );
}
export default RoutesProtector;
