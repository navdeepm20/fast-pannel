//mui
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

function PageHeading({ title, ...props }) {
  const theme = useTheme();
  delete props?.sx;
  return (
    <Typography
      component="h2"
      sx={{
        fontSize: "20px",
        color: "text.black",
        py: "1rem",
        mb: "2rem",
        px: "1rem",
        borderLeft: `8px solid ${theme.palette.primary.main}`,
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        ...props.sx,
      }}
    >
      {title}
    </Typography>
  );
}

export default PageHeading;
