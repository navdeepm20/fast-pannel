import AppsIcon from "@mui/icons-material/Apps";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../../utils/utility";

export const sidebarConfig = [
  {
    title: "apps",
    path: "/",
    icon: <AppsIcon />,
    onClickHandler: () => {},
    tooltipText: "Apps",
  },
  {
    title: "profile",
    path: "/profile",
    icon: <PersonIcon />,
    onClickHandler: () => {},
    tooltipText: "Profile",
  },
  {
    title: "logout",
    path: "",
    icon: <LogoutIcon />,
    onClickHandler: (e, dispatch) => {
      logout(dispatch);
    },
    tooltipText: "Logout",
  },
];
