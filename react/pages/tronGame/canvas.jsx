import {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  NONE,
  GAME,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  STARTING_COORD,
  COLORS
} from "./literals";
import { getColorCode } from "./utils";
import { init } from "./init";
import { addKeydownListener } from "./listeners";

let gameInfo = GAME;
gameInfo.onTimerTick = onTimerTick;

const initFunc = init.bind(gameInfo);

export const Main = async () => {
  await initFunc();
  const listener = addKeydownListener.bind(gameInfo);
  listener();
};

//GAME FUNCTION
function onTimerTick() {
  let { player1, player2 } = this;
  const { ctx, intervalID } = gameInfo;
  const p1Color = COLORS[player1.color];
  const p2Color = COLORS[player2.color];

  player1 = movePlayer(player1);
  player2 = movePlayer(player2);

  const p1Alive = isAlive(player1, ctx, p1Color, p2Color);
  const p2Alive = isAlive(player2, ctx, p1Color, p2Color);

  if (!p1Alive) {
    window.alert(`${player1.name} Loses`);
    restart(this.player1, this.player2, intervalID, ctx);
  } else if (!p2Alive) {
    window.alert(`${player2.name} Loses`);
    restart(this.player1, this.player2, intervalID, ctx);
  } else {
    ctx.fillStyle = COLORS[player1.color];
    ctx.fillRect(player1.x_pos, player1.y_pos, 5, 5);
    ctx.fillStyle = COLORS[player2.color];
    ctx.fillRect(player2.x_pos, player2.y_pos, 5, 5);
  }

  this.player1 = player1;
  this.player2 = player2;
}

function movePlayer(player) {
  switch (player.direction) {
    case UP:
      player.y_pos -= 5;
      break;
    case DOWN:
      player.y_pos += 5;
      break;
    case LEFT:
      player.x_pos -= 5;
      break;
    case RIGHT:
      player.x_pos += 5;
      break;
    default:
      break;
  }
  return player;
}

function isAlive(player, ctx, color1, color2) {
  if (player.direction !== NONE) {
    const positionLookAhead = ctx.getImageData(
      player.x_pos,
      player.y_pos,
      1,
      1
    ).data;
    const hex = getColorCode(
      positionLookAhead[0],
      positionLookAhead[1],
      positionLookAhead[2]
    );

    return (
      !(hex === color1) &&
      !(hex === color2) &&
      player.x_pos >= 0 &&
      player.x_pos < CANVAS_WIDTH &&
      player.y_pos >= 0 &&
      player.y_pos < CANVAS_HEIGHT
    );
  } else {
    return true;
  }
}

function restart(player1, player2, intervalID, ctx) {
  clearInterval(intervalID);
  player1.direction = NONE;
  player2.direction = NONE;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  player1.x_pos = STARTING_COORD;
  player1.y_pos = STARTING_COORD;
  player2.x_pos = STARTING_COORD;
  player2.y_pos = STARTING_COORD * 2;
  ctx.fillStyle = COLORS[player1.color];
  ctx.fillRect(player1.x_pos, player1.y_pos, 5, 5);
  ctx.fillStyle = COLORS[player2.color];
  ctx.fillRect(player2.x_pos, player2.y_pos, 5, 5);
}
