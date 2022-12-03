// @mui
import { styled } from "@mui/material/styles";
import { ListItemIcon, ListItemButton } from "@mui/material";

// ----------------------------------------------------------------------

export const StyledNavItem = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.white,
  borderRadius: theme.shape.borderRadius,
  ":hover": {
    backgroundColor: theme.palette.navitem.hover,
  },
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
