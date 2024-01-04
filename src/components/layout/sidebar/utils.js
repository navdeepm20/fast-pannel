// @mui
import { styled } from "@mui/material/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import MuiDrawer from "@mui/material/Drawer";
import { DRAWER_WIDTH, CLOSED_DRAWER_WIDTH } from "../utils";
import AppsIcon from "@mui/icons-material/Apps";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

export const getSidebarConfig = ({
  handleLogoutClick,
  handleProfileClick,
  handleAppsClick,
  ...props
}) => [
  {
    title: "apps",
    path: "/",
    icon: <AppsIcon />,
    onClickHandler: handleAppsClick ? handleAppsClick : () => {},
    tooltipText: "Apps",
  },
  {
    title: "profile",
    path: "/profile",
    icon: <PersonIcon />,
    onClickHandler: handleProfileClick ? handleProfileClick : () => {},
    tooltipText: "Profile",
  },
  {
    title: "logout",
    path: "",
    icon: <LogoutIcon />,
    onClickHandler: handleLogoutClick ? handleLogoutClick : () => {},
    tooltipText: "Logout",
  },
];

export const StyledNavItem = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.white,
  borderRadius: theme.shape.borderRadius,
  transition: "color .2s ease",
  padding: 16,
  gap: 12,

  "&:hover": {
    color: "#9f9f9f",
  },
}));

export const StyledNavItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: 22,
  height: 22,
  ...(!open && { minWidth: 0 }),
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const openedMixin = (theme) => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

export const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `${CLOSED_DRAWER_WIDTH}px`,
  [theme.breakpoints.up("sm")]: {
    width: `${CLOSED_DRAWER_WIDTH}px`,
  },
});
export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
