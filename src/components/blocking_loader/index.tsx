// ----------MUI Imports ----------------------
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

//types
interface BlockingLoaderTypes {
  message: string;
  show: boolean;
  [props: string]: any;
}

export default function BlockingLoader({
  message,
  show,
  ...props
}: BlockingLoaderTypes) {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: props.componentLevel ? 2 : (theme) => theme.zIndex.drawer + 1,
      }}
      open={show}
      // onClick={handleClose}
    >
      <Paper
        sx={{
          width: { xs: "280px", sm: "340px", md: "440px" },
          height: { xs: "150px", sm: "190px", md: "250px" },
          display: "flex",
          flexFlow: "nowrap column",
          justifyContent: "center",
          alignItems: "center",
          p: "20px",
        }}
        elevation={0}
      >
        <Typography
          component="span"
          sx={{
            fontWeight: "500",
            fontSize: "20px",
            lineHeight: "26px",
            /* identical to box height */
            textAlign: "center",
            color: "#0F0F0F",
            mb: "16px",
          }}
        >
          {message}
        </Typography>
        <CircularProgress
          sx={{
            "& .MuiCircularProgress-svg": {
              //   color:
              //     "linear-gradient(45deg,rgba(44, 169, 227, 1),rgba(255, 255, 255, 0))",
              color: "rgba(44, 169, 227, 1)",
            },
          }}
        />
      </Paper>
    </Backdrop>
  );
}
