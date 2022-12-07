import ApprovalIcon from "@mui/icons-material/Approval";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../../utils/utility";

export const sidebarConfig = [
  {
    title: "apps",
    path: "/",
    icon: <ApprovalIcon />,
    onClickHandler: () => {},
  },
  {
    title: "profile",
    path: "/profile",
    icon: <PersonIcon />,
    onClickHandler: () => {},
  },
  {
    title: "logout",
    path: "#",
    icon: <LogoutIcon />,
    onClickHandler: (e, dispatch) => {
      logout(dispatch);
    },
  },
];
