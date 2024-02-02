//mui
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//assets
import ErrorSvg from "../../assets/server-down.svg";

function ErrorOccured() {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
      }}
      justifyContent="center"
      alignItems="center"
      className="error-component__container"
    >
      <Stack justifyContent="center" alignItems="center">
        <Box display="grid" sx={{ placeItems: "center" }}>
          <Box
            component="img"
            src={ErrorSvg}
            alt="something_went_wrong"
            sx={{ maxWidth: 400 }}
          ></Box>
        </Box>

        <Typography component="h3" variant="h4" mt={4}>
          An Error Occured
        </Typography>
        <Typography component="p" variant="body">
          Refreshing the page might help
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ErrorOccured;
