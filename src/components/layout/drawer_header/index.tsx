//mui
import { SxProps, Theme, styled } from "@mui/material/styles";

// type

const CustomDrawer = styled("div")<{ sx: SxProps; children: React.ReactNode }>(
  ({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  })
);
const DrawerHeader = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx: SxProps;
}) => {
  return <CustomDrawer sx={{ ...sx }}>{children}</CustomDrawer>;
};

export default DrawerHeader;
