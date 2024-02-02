import { NavLink } from "react-router-dom";
// @mui
import { Box, List, ListItemText } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./utils";
//hooks
import useAuth from "../../../hooks/useAuth";
//types
import { SidebarConfigTypes } from "./utils";
import { BoxProps } from "@mui/material";

export default function NavSection({
  data,
  open,
  ...other
}: {
  data: SidebarConfigTypes[];
  open: boolean;
  boxProps?: BoxProps;
}) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: open ? 1 : 0 }}>
        {data.map((item) => {
          return <NavItem key={item.title} item={item} open={open} />;
        })}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

function NavItem({ item, open }: { item: SidebarConfigTypes; open: boolean }) {
  const { title, path, icon, onClickHandler, tooltipText } = item;

  const { dispatch } = useAuth();
  return (
    <>
      {path ? (
        <NavLink
          to={path}
          style={{ textDecoration: "none" }}
          id="navlink"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "navlink--active" : ""
          }
        >
          <StyledNavItem
            className="styled__navitem"
            onClick={onClickHandler}
            sx={{ justifyContent: open ? "flex-start" : "center" }}
          >
            <StyledNavItemIcon title={tooltipText && tooltipText}>
              {icon && icon}
            </StyledNavItemIcon>
            {open && <ListItemText disableTypography primary={title} />}
          </StyledNavItem>
        </NavLink>
      ) : (
        <StyledNavItem
          className="styled__navitem"
          sx={{ justifyContent: open ? "flex-start" : "center" }}
          onClick={() => {
            onClickHandler(dispatch);
          }}
        >
          <StyledNavItemIcon title={tooltipText && tooltipText}>
            {icon && icon}
          </StyledNavItemIcon>
          {open && <ListItemText disableTypography primary={title} />}
        </StyledNavItem>
      )}
    </>
  );
}
