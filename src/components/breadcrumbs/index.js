//mui
import { default as MUIBreadcrumbs } from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
//router
import { Link as RouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function LinkRouter(props) {
  return (
    <Link
      component={RouterLink}
      sx={{
        px: 2,
        py: 1,
        "&:hover": {
          color: "primary.main",
          backgroundColor: "primary.hover",
          fontWeight: "500",
        },
      }}
      {...props}
    />
  );
}

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((path) => path);

  return (
    <MUIBreadcrumbs
      aria-label="breadcrumb"
      sx={{
        mb: 3,
        // backgroundColor: "customGrey.main",

        borderRadius: 1,
        maxWidth: "max-content",
      }}
      separator={<NavigateNextIcon fontSize="small" />}
    >
      <LinkRouter underline="hover" color="inherit" to="/">
        Home
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="text.primary" key={value}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </LinkRouter>
        );
      })}
    </MUIBreadcrumbs>
  );
}

export default Breadcrumbs;
