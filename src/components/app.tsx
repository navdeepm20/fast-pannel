import { h } from "preact";
import AppRoutes from "../routes";
//provider
import Provider from "./providers";
function App({ ...props }) {
  return (
    <Provider>
      <AppRoutes />
    </Provider>
  );
}

export default App;
