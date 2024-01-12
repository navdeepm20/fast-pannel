import { h } from "preact";
import AppRoutes from "../routes";
//provider
import Provider from "./providers";
function App({ ...props }) {
  return (
    <div id="app">
      <Provider>
        <AppRoutes />
      </Provider>
    </div>
  );
}

export default App;
