import { h } from "preact";
import AppRoutes from "../routes";
//provider
import Provider from "./providers";
const App = (e) => (
  <div id="app">
    <Provider>
      <AppRoutes />
    </Provider>
  </div>
);

export default App;
