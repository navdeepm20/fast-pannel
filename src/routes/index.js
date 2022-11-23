import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "../page/dashboard";
import Model from "../page/models";
import Layout from "../components/layout";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route exact element={<Model />} path="/models" />
        </Route>
        <Route exact element={<Model />} path="/models" />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
