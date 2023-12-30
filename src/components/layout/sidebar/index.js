//mui
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//assets
import Logo from "../../../assets/logo/fastpannel1.png";
//internal
import NavSection from "./NavSection";
//sidebarconfig
import { sidebarConfig } from "./sidebarConfig";
//hooks internal
import useAuth from "../../../hooks/useAuth";

const Sidebar = ({ DRAWER_WIDTH, open, handleDrawerClose, ...props }) => {
  const [user] = useAuth();
  const theme = useTheme();
  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          backgroundColor: "sidebar.dark",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box
        sx={{
          px: "20px",
          py: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Avatar sx={{ m: "auto", width: "64px", height: "64px" }} src={Logo} />
        {/* <Typography
          component="h2"
          sx={{
            fontSize: "1.25rem",
            lineHeight: "1.6",
            textAlign: "center",
            py: "1.1rem",
            textAlign: "center",
            color: "#212b36",
          }}
        >
          Fast Pannel
        </Typography> */}
        <Box>
          <IconButton onClick={handleDrawerClose} sx={{ ml: "auto" }}>
            {theme.direction === "ltr" ? (
              <Box
                sx={{
                  width: "30px",
                  height: "30px",
                  color: "text.white",
                  border: "1px solid white",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                title="Collapse Sidebar"
              >
                <ChevronLeftIcon sx={{ color: "text.white" }} />
              </Box>
            ) : (
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  color: "text.white",
                  border: "1px solid white",
                  border: "1px solid white",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                title="Collapse Sidebar"
              >
                <ChevronRightIcon sx={{ color: "text.white" }} />
              </Box>
            )}
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          px: "20px",
          mt: "2rem",
        }}
      >
        <Box
          sx={{
            py: "16px",
            px: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "#edeff2",
            borderRadius: "8px",
            mb: "3rem",
          }}
        >
          <Avatar sx={{ backgroundColor: "#673ab7", mr: "8px" }}>
            {user?.user?.first_name?.charAt(0)}
          </Avatar>
          <Typography>{user?.user?.first_name}</Typography>
        </Box>
        <NavSection data={sidebarConfig} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
