import React from "react";
//internal
import AppCard from "../../components/cards/app_card";
//mui
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
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
