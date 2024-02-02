import { useEffect, useState } from "preact/hooks";
//internal
import AppCard from "../../components/cards/app_card";
import Loader from "../../components/loading";
//mui
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
//hooks
import useAxios from "../../hooks/useAxios";
//utils
import urls from "../../utils/urls.json";
import { getAuthToken } from "../../utils/utility";

export interface AppDataType {
  app_name: string;
  models: [];
}

function Apps() {
  const { response, loading } = useAxios({
    url: urls?.apps_get?.url,
    method: urls?.apps_get?.method,
    headers: {
      Authorization: getAuthToken(),
    },
  });

  const [appsData, setAppsData] = useState<AppDataType[]>([]);

  useEffect(() => {
    if (response) {
      setAppsData(response.data);
    }
  }, [response]);

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      {loading ? (
        <Loader sx={{ height: "calc(100% - 85px)" }} />
      ) : (
        <>
          <Stack direction="row" gap="24px" flexWrap="wrap">
            {appsData
              ?.filter((app) => app?.models?.length > 0)
              .map((app) => {
                return (
                  <AppCard
                    appName={app?.app_name}
                    displayName={app.app_name?.split(".")?.pop()}
                    models={app?.models}
                  ></AppCard>
                );
              })}
          </Stack>
        </>
      )}
    </Paper>
  );
}

export default Apps;
