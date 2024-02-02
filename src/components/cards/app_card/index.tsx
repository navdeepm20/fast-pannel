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

//types
interface AppCardTypes {
  appName: string;
  models: { name: string }[];
  displayName: string;
  [props: string]: any;
}
function AppCard({ appName, models, displayName }: AppCardTypes) {
  const navigate = useNavigate();
  const handleAdd = (e: MouseEvent, appName: string, modelName: string) => {
    e.stopPropagation();
    navigate(`/${appName}/${modelName}/add`);
  };
  const handleEdit = (e: MouseEvent, appName: string, modelName: string) => {
    e.stopPropagation();
    navigate(`/${appName}/${modelName}`);
  };
  const handleModelClick = (
    e: MouseEvent,
    appName: string,
    modelName: string
  ) => {
    navigate(`/${appName}/${modelName}`);
  };
  const handleShowMore = (e: MouseEvent, appName: string) => {
    navigate(`/${appName}`);
  };
  return (
    <Card
      sx={{
        width: "clamp(300px,25%,350px)",
        minWidth: "300px",
        ":hover": {
          boxShadow:
            "rgb(159 162 191 / 18%) 0px 5px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;",
        },
        display: "flex",
        flexFlow: "column wrap",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            backgroundColor: "sky_blue.main",
            p: "1rem",
            borderRadius: "8px",
            mb: "1rem",
            textTransform: "capitalize",
            cursor: "pointer",
          }}
          onClick={(e: MouseEvent) => {
            handleShowMore(e, appName);
          }}
        >
          {displayName}
        </Typography>
        <Stack>
          {models.length > 3
            ? models.slice(0, 3).map((model) => {
                return (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      cursor: "pointer",
                      p: ".5rem .3rem",
                      borderRadius: "8px",

                      border: "1px solid transparent",
                      ":hover": {
                        boxShadow:
                          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                      },
                    }}
                    onClick={(e: MouseEvent) =>
                      handleModelClick(e, appName, model?.name)
                    }
                  >
                    <Typography variant="body2">{model?.name}</Typography>
                    <Box>
                      <IconButton
                        onClick={(e: MouseEvent) =>
                          handleAdd(e, appName, model?.name)
                        }
                      >
                        <LibraryAddIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={(e: MouseEvent) =>
                          handleEdit(e, appName, model?.name)
                        }
                      >
                        <DriveFileRenameOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Stack>
                );
              })
            : models.map((model) => {
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
                    onClick={(e: MouseEvent) =>
                      handleModelClick(e, appName, model?.name)
                    }
                  >
                    <Typography variant="body2">{model?.name}</Typography>
                    <Box>
                      <IconButton
                        onClick={(e: MouseEvent) =>
                          handleAdd(e, appName, model?.name)
                        }
                      >
                        <LibraryAddIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={(e: MouseEvent) =>
                          handleEdit(e, appName, model?.name)
                        }
                      >
                        <DriveFileRenameOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Stack>
                );
              })}
        </Stack>
      </CardContent>
      {models?.length > 2 ? (
        <CardActions sx={{ mt: "auto" }}>
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
