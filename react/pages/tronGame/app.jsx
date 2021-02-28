import * as React from "react";
import { render } from "react-dom";
import TronGame from "../../../mdx/TronGame.mdx";
import { Main } from "./canvas.jsx";

render(<TronGame />, document.getElementById("root"), Main);
