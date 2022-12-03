import { Link } from "react-router-dom";
// @mui
import { Box, List, ListItemText } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";
//hooks
import useAuth from "../../../hooks/useAuth";
// ----------------------------------------------------------------------

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => {
          return <NavItem key={item.title} item={item} />;
        })}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const { title, path, icon, info, onClickHandler } = item;
  const [, dispatch] = useAuth();
  return (
    <Link to={path} style={{ textDecoration: "none" }}>
      <StyledNavItem
        sx={{
          "&.active": {
            color: "text.primary",
            backgroundColor: "navitem.hover",
            fontWeight: "fontWeightBold",
          },
        }}
        onClick={(e) => {
          onClickHandler(e, dispatch);
        }}
      >
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
        <ListItemText disableTypography primary={title} />
        {info && info}
      </StyledNavItem>
    </Link>
  );
}
