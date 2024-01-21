//mui
import { default as MUIBreadcrumbs } from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
//router
import { Link as RouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";

function LinkRouter(props) {
  return (
    <>
      <Link
        component={RouterLink}
        sx={{
          px: 2,
          py: 1,
          backgroundColor: "primary.hover",
          display: "grid",
          placeItems: "center",
          borderRadius: 2,
          "&:hover": {
            color: "primary.main",
            // fontWeight: "500",
          },
        }}
        {...props}
      />
    </>
  );
}

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((path) => path);

  return (
    <Box>
      <MUIBreadcrumbs
        aria-label="breadcrumb"
        sx={{
          mb: 3,
          mt: 1,
          // backgroundColor: "customGrey.main",

          borderRadius: 1,
          maxWidth: "max-content",
        }}
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <LinkRouter underline="hover" color="inherit" to="/">
          <HomeOutlinedIcon />
        </LinkRouter>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <Typography
              color="inherit"
              key={value}
              sx={{
                px: 2,
                py: 1,
                backgroundColor: "primary.hover",
                borderRadius: 2,
              }}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Typography>
          ) : (
            <LinkRouter underline="hover" color="inherit" to={to} key={to}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </LinkRouter>
          );
        })}
      </MUIBreadcrumbs>
    </Box>
  );
}

export default Breadcrumbs;
