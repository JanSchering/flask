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
  const canvas = document.getElementById("testCanvas");
  const env = new Environment(p1, p2, canvas);

  setInterval(() => {
    env.step();
    if (!env.player1.isAlive()) {
      env.player2.incrementScore();
      env.scoreBoard.updatep2Score(env.player2.score);
      env.reset();
    } else if (!env.player2.isAlive()) {
      env.player1.incrementScore();
      env.scoreBoard.updatep1Score(env.player1.score);
      env.reset();
    } else {
      env.renderPlayer(env.player1);
      env.renderPlayer(env.player2);
    }
  }, 33);
};

render(<TronGame />, document.getElementById("root"), Main);
