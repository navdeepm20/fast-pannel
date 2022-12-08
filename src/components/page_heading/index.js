//mui
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function PageHeading({ title, ...props }) {
  const theme = useTheme();
  delete props?.sx;
  return (
    <Box
      sx={{
        py: "1rem",
        mb: "2rem",
        px: "1rem",
        backgroundColor: "#f5f6fa",
        borderLeft: `8px solid ${theme.palette.primary.main}`,
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: "4px",
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontSize: "20px",
          color: "text.black",
          textTransform: "capitalize",
          ...props.sx,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default PageHeading;
