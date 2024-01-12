import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "../components/layout";
// import Dashboard from "../page/dashboard";
import Model from "../page/model";
import Apps from "../page/Apps";
import Models from "../page/models";
import SignIn from "../page/signin";
import Profile from "../page/profile";

import ModelObjectCreate from "../page/ModelObject/Create";
import ModelObjectEdit from "../page/ModelObject/Edit";

//routes protector
import RoutesProtector from "./RoutesProtector";
//utils
import { appRoutes } from "../utils/appRoutes";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<RoutesProtector />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Apps />} path={appRoutes.apps} />
            <Route exact element={<Models />} path={appRoutes.models} />
            <Route exact element={<Model />} path={appRoutes?.model} />
            <Route
              exact
              element={<ModelObjectCreate />}
              path={appRoutes?.modelObjectCreate}
            />
            <Route
              exact
              element={<ModelObjectEdit />}
              path={appRoutes?.modelObjectEdit}
            />
            <Route exact element={<Profile />} path={appRoutes?.profile} />
          </Route>
        </Route>
        <Route exact element={<SignIn />} path={appRoutes.login} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
