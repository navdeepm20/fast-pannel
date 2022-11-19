import { h } from "preact";
import style from "./style.css";
import Button from "@mui/material/Button";

const Home = () => (
  <div class={style.home}>
    <h1>Home</h1>
    <p>This is the Home component.</p>
    <Button variant="contained" color="secondary">
      Hello
    </Button>
  </div>
);

export default Home;
