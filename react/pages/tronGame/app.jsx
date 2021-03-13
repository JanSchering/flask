import * as React from "react";
import { render } from "react-dom";
import TronGame from "../../../mdx/TronGame.mdx";
import { init } from "./init";
import { Environment } from "./environment.js";
import { Player } from "./player.js";
import { X_START, Y_START } from "./literals";

const Main = async () => {
  const { p1Name, p1Color, p2Name, p2Color } = await init();
  const p1 = new Player(p1Color, p1Name, X_START, Y_START);
  const p2 = new Player(p2Color, p2Name, X_START, Y_START * 2);
  const env = new Environment(p1, p2);

  setInterval(loopHandler.bind(env), 33);
};

function loopHandler() {
  this.step();
}

render(<TronGame />, document.getElementById("root"), Main);
