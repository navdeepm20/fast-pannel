//mui
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
//types
import { SxProps } from "@mui/material";
function Loader({ sx }: { sx?: SxProps }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loader;
