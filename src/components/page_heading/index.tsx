//mui
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//types
import { SxProps } from "@mui/material";
function PageHeading({ title, sx }: { title: string; sx: SxProps }) {
  return (
    <Box
      sx={{
        py: 2,
        mb: 4,
        borderRadius: "4px",
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontSize: "20px",
          color: "text.black",
          textTransform: "capitalize",
          ...sx,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default PageHeading;
