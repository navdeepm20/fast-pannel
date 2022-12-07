//mui
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

//internal
import CustomButton from "../../utility/Btn";

//libs
import { useNavigate } from "react-router-dom";

function AppCard({ appName, models, ...props }) {
  const navigate = useNavigate();
  const handleAdd = (e, appName, modelName) => {
    e.stopPropagation();
    navigate(`/apps/${appName}/models/${modelName}/add`);
  };
  const handleEdit = (e, appName, modelName) => {
    e.stopPropagation();
    navigate(`/apps/${appName}/models/${modelName}`);
  };
  const handleModelClick = (e, appName, modelName) => {
    navigate(`/apps/${appName}/models/${modelName}`);
  };
  const handleShowMore = (e, appName) => {
    navigate(`/apps/${appName}`);
  };
  return (
    <Card sx={{ minWidth: "300px", maxWidth: "350px" }}>
      <CardContent sx={{}}>
        <Typography
          variant="h5"
          sx={{
            backgroundColor: "sky_blue.main",
            p: "1rem",
            borderRadius: "8px",
            mb: "1rem",
          }}
        >
          {appName}
        </Typography>
        <Stack>
          {models.length > 3
            ? models.slice(0, 3).map((model, index) => {
                return (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      cursor: "pointer",
                      p: ".5rem .3rem",
                      borderRadius: "8px",
                      ":hover": { backgroundColor: "sky_blue.main" },
                    }}
                    onClick={(e) => handleModelClick(e, appName, model?.name)}
                  >
                    <Typography variant="body2">{model?.name}</Typography>
                    <Box>
                      <IconButton
                        onClick={(e) => handleAdd(e, appName, model?.name)}
                      >
                        <LibraryAddIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={(e) => handleEdit(e, appName, model?.name)}
                      >
                        <DriveFileRenameOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Stack>
                );
              })
            : models.map((model, index) => {
                return (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      cursor: "pointer",
                      p: ".5rem .3rem",
                      borderRadius: "8px",
                      ":hover": { backgroundColor: "sky_blue.main" },
                    }}
                    onClick={(e) => handleModelClick(e, appName, model?.name)}
                  >
                    <Typography variant="body2">{model?.name}</Typography>
                    <Box>
                      <IconButton
                        onClick={(e) => handleAdd(e, appName, model?.name)}
                      >
                        <LibraryAddIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={(e) => handleEdit(e, appName, model?.name)}
                      >
                        <DriveFileRenameOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Stack>
                );
              })}
        </Stack>
      </CardContent>
      {models?.length >= 3 ? (
        <CardActions>
          <CustomButton
            variant="text"
            sx={{ m: "auto" }}
            onClick={(e) => handleShowMore(e, appName)}
          >
            Show More
          </CustomButton>
        </CardActions>
      ) : (
        <></>
      )}
    </Card>
  );
}

AppCard.defaultProps = {
  appName: "App Name",
  models: [{ modelName: "Test" }],
};
export default AppCard;
