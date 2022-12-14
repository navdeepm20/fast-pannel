import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "../components/layout";
import Dashboard from "../page/dashboard";
import Model from "../page/model";
import Apps from "../page/Apps";
import Models from "../page/models";
import SignIn from "../page/signin";
import Profile from "../page/profile";

import ModelObjectCreate from "../page/ModelObject/Create";
import ModelObjectEdit from "../page/ModelObject/Edit";

//routes protector
import RoutesProtector from "./RoutesProtector";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<RoutesProtector />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Apps />} />
            <Route exact element={<Models />} path="/apps/:appName" />
            <Route
              exact
              element={<Model />}
              path="/apps/:appName/models/:modelName"
            />
            <Route
              exact
              element={<ModelObjectCreate />}
              path="/apps/:appName/models/:modelName/add"
            />
            <Route
              exact
              element={<ModelObjectEdit />}
              path="/apps/:appName/models/:modelName/:objectId/edit"
            />
            <Route exact element={<Profile />} path="/profile" />
          </Route>
        </Route>
        <Route exact element={<SignIn />} path="/signin" />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
