import * as React from "react";
import { render } from "react-dom";
import TronGame from "../../../mdx/TronGame.mdx";
import { GAME } from "./literals";
import { getColorCode } from "./utils";
import { init } from "./init";
import { addKeydownListener } from "./listeners";

const initFunc = init.bind(GAME);

const Main = async () => {
  await initFunc();
  const listener = addKeydownListener.bind(GAME);
  listener();
};

render(<TronGame />, document.getElementById("root"), Main);
