import { useEffect, useState } from "preact/hooks";

//internal
import AppCard from "../../components/cards/app_card";
//mui
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
//hooks
import useAxios from "../../hooks/useAxios";
//utils
import urls from "../../utils/urls.json";
import { getAuthToken } from "../../utils/utility";

const appsData = [
  {
    name: "Core",
    models: [
      {
        name: "Model 1",
      },
      {
        name: "Model 2",
      },
      {
        name: "Model 3",
      },
    ],
  },
  {
    name: "Core",
    models: [
      {
        name: "Model 1",
      },
      {
        name: "Model 2",
      },
      {
        name: "Model 3",
      },
    ],
  },
  {
    name: "Core",
    models: [
      {
        name: "Model 1",
      },
      {
        name: "Model 2",
      },
      {
        name: "Model 3",
      },
    ],
  },
  {
    name: "Core",
    models: [
      {
        name: "Model 1",
      },
      {
        name: "Model 2",
      },
      {
        name: "Model 3",
      },
    ],
  },
  {
    name: "Core",
    models: [
      {
        name: "Model 1",
      },
      {
        name: "Model 2",
      },
      {
        name: "Model 3",
      },
    ],
  },
];

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
      setAppsData(response.data?.items);
    }
  }, [response]);
  return (
    <Paper elevation={0}>
      <Stack
        direction="row"
        gap="24px"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        {appsData.map((app, index) => {
          return <AppCard appName={app?.name} models={app?.models}></AppCard>;
        })}
      </Stack>
    </Paper>
  );
}

export default Apps;
