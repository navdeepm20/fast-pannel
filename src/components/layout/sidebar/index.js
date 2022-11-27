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
import NavSection from "../navbar/NavSection";
//sidebarconfig
import { sidebarConfig } from "./sidebarConfig";

const Sidebar = ({ DRAWER_WIDTH, open, handleDrawerClose, ...props }) => {
  const theme = useTheme();
  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
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
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
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
          <Avatar sx={{ backgroundColor: "#673ab7", mr: "8px" }}>N</Avatar>
          <Typography>John Doe</Typography>
        </Box>
        <NavSection data={sidebarConfig} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
