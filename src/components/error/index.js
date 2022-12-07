//mui
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ErrorOccured({ ...props }) {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack justifyContent="center" alignItems="center">
        <Typography component="h5" variant="h5">
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
