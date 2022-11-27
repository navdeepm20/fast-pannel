import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "../components/layout";
import Dashboard from "../page/dashboard";
import Model from "../page/model";
import Apps from "../page/Apps";
import Models from "../page/models";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route exact element={<Apps />} path="/apps" />
          <Route exact element={<Models />} path="/apps/:appName" />
          <Route
            exact
            element={<Model />}
            path="/apps/:appName/models/:modelName"
          />
        </Route>
        {/* <Route exact element={<Apps />} path="/apps" /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
