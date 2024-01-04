//mui
import { default as MUIBreadcrumbs } from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
//router
import { useLocation } from "react-router-dom";

function LinkRouter(props) {
  return <Link {...props} component={RouterLink} />;
}

const breadcrumbNameMap = {
  "/inbox": "Inbox",
  "/models/important": "Important",
  "/apps/app": "Apps",
  "/app": "App",
  "/profile": "Profile",
};

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <MUIBreadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <LinkRouter underline="hover" color="inherit" to="/">
        Home
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </MUIBreadcrumbs>
  );
}

export default Breadcrumbs;
