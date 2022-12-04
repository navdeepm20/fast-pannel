import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "../components/layout";
import Dashboard from "../page/dashboard";
import Model from "../page/model";
import Apps from "../page/Apps";
import Models from "../page/models";
import SignIn from "../page/signin";
import Profile from "../page/profile";

import ModelObject from "../page/ModelObject";

//routes protector
import RoutesProtector from "./RoutesProtector";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<RoutesProtector />}>
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<Dashboard />} /> */}
            <Route index element={<Apps />} />
            <Route exact element={<Models />} path="/apps/:appName" />
            <Route
              exact
              element={<Model />}
              path="/apps/:appName/models/:modelName"
            />
            <Route
              exact
              element={<ModelObject />}
              path="/apps/:appName/models/:modelName/add"
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
