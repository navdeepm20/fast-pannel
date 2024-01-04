//mui
import { useTheme } from "@mui/material/styles";
// import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//assets
import Logo from "../../../assets/logo/fast-panel-logo-2.png";
//internal
import NavSection from "./NavSection";
import { Drawer } from "./utils";
//sidebarconfig
import { sidebarConfig } from "./sidebarConfig";
//hooks internal
import useAuth from "../../../hooks/useAuth";

const Sidebar = ({
  DRAWER_WIDTH,
  open,
  handleDrawerClose,
  handleDrawerOpen,
  ...props
}) => {
  const [user] = useAuth();
  const theme = useTheme();
  return (
    <Box position="relative">
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "sidebar.dark",
            overflowY: "visible",
          },
        }}
        variant="permanent"
        anchor="left"
        open={open}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: "auto",
              ...(open ? { mr: 1 } : { mx: "auto" }),
            }}
            src={Logo}
          />
          {open && (
            <Typography
              component="h2"
              sx={{
                fontSize: "1.5rem",
                lineHeight: "1.6",
                textAlign: "center",
                py: "1.1rem",
                textAlign: "center",
                color: "#fff",
              }}
            >
              Fast Panel
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            px: open ? 2.5 : 1,
            mt: "2rem",
          }}
        >
          <Box
            sx={{
              py: 2,

              display: "flex",
              alignItems: "center",
              ...(open && {
                backgroundColor: "#edeff2",
                borderRadius: 1,
                px: 2.5,
              }),
              justifyContent: "flex-start",

              mb: "3rem",
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "#673ab7",
                ...(open ? { mr: 1 } : { mx: "auto" }),
                cursor: "pointer",
              }}
              title={
                user?.user?.first_name &&
                user?.user?.first_name?.charAt(0)?.toUpperCase() +
                  user?.user?.first_name.slice(1)
              }
            >
              {user?.user?.first_name?.charAt(0)?.toUpperCase()}
            </Avatar>
            {open && (
              <Typography>
                {user?.user?.first_name?.charAt(0)?.toUpperCase() +
                  user?.user?.first_name.slice(1)}
              </Typography>
            )}
          </Box>
          <NavSection data={sidebarConfig} open={open} />
        </Box>
      </Drawer>
      <Box
        sx={{
          position: "absolute",
          bottom: "1rem",
          right: "-1rem",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <IconButton
          onClick={open ? handleDrawerClose : handleDrawerOpen}
          sx={{
            // ml: "auto",
            width: "30px",
            height: "30px",
            color: "text.white",
            border: "1px solid white",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "sidebar.dark",
            ":hover": {
              backgroundColor: "sidebar.dark",
            },
          }}
        >
          <ChevronLeftIcon
            sx={{
              color: "text.white",
              transition: "transform .5s ease",
              ...(open && { transform: "rotate(180deg)" }),
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Sidebar;
