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

function Apps({ ...props }) {
  const [response, error, loading, refetch] = useAxios({
    url: urls?.apps_get?.url,
    method: urls?.apps_get?.method,
    headers: {
      Authorization: getAuthToken(),
    },
  });

  const [appsData, setAppsData] = useState([]);

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
      }}
    >
      {loading ? (
        <Loader sx={{ height: "calc(100% - 85px)" }} />
      ) : (
        <>
          <Stack direction="row" gap="24px" flexWrap="wrap">
            {appsData
              ?.filter((app) => app?.models?.length > 0)
              .map((app, index) => {
                return (
                  <AppCard
                    appName={app?.app_name}
                    displayName={app?.app_name?.split(".")?.pop()}
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
