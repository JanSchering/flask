import {
  COLORPICKER,
  COLORS,
  UP,
  DOWN,
  LEFT,
  RIGHT,
  NONE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  STARTING_COORD
} from "./literals";

/**
 * @description Helper-Function: Takes a numeric value for each the red, green and blue amount that we want
 * and returns the respective hexcode.
 * @param {number} r The numeric value of the amount of red (should be between 0 and 255).
 * @param {number} g The numeric value of the amount of green (should be between 0 and 255).
 * @param {number} b The numeric value of the amount of blue (should be between 0 and 255).
 * @returns {string} The Hex-Number as a string.
 */
function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}

/**
 * @description Util-Function: Takes a numeric value for each the red, green and blue amount that we want
 * and returns the Color-Code.
 * @param {number} r The numeric value of the amount of red (should be between 0 and 255).
 * @param {number} g The numeric value of the amount of green (should be between 0 and 255).
 * @param {number} b The numeric value of the amount of blue (should be between 0 and 255).
 * @returns {string} The Hex-Number formatted as a ColorCode
 */
export function getColorCode(r, g, b) {
  return "#" + ("000000" + rgbToHex(r, g, b)).slice(-6);
}

/**
 * @description Creates A "ColorPicker": HTML Container-Element which containes a set of colored containers.
 * @param {string} id The ID of the ColorPicker container Node.
 * @param {string} defaultColor possible values are: "red", "green", "blue", "yellow"
 * @returns {HTMLDivElement} A container thay contains a set of colored containers
 */
export function createColorPicker(id, defaultColor) {
  const tmpContainer = document.createElement("div");
  tmpContainer.innerHTML = COLORPICKER;
  const colorPicker = tmpContainer.childNodes[0];
  colorPicker.id = id;
  if (defaultColor) {
    const choices = colorPicker.querySelectorAll("div[data-color]");
    Array.prototype.forEach.call(choices, choice => {
      if (choice.getAttribute("data-color") === defaultColor) {
        choice.className += " picked";
      }
    });
  }
  return colorPicker;
}

/**
 * @description Executes one time step in the game.
 */
export function onTimerTick() {
  let { player1, player2, ctx, intervalID } = this;
  const p1Color = COLORS[player1.color];
  const p2Color = COLORS[player2.color];

  player1 = movePlayer(player1);
  player2 = movePlayer(player2);

  const p1Alive = isAlive(player1, ctx, p1Color, p2Color);
  const p2Alive = isAlive(player2, ctx, p1Color, p2Color);

  if (!p1Alive) {
    player2.score += 1;
    window.alert(`
      ${player2.name} Wins!
      current score:
      ${player1.name}: ${player1.score} - ${player2.name}: ${player2.score}
      `);
    restart(this.player1, this.player2, intervalID, ctx);
  } else if (!p2Alive) {
    player1.score += 1;
    window.alert(`${player1.name} Wins!`);
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

/**
 * @description Moves a player in the currently set direction of the player.
 * @param {
 *  direction: string,
 *  y_pos: number,
 *  x_pos: number,
 *  ...attr
 * }  player - The player object that is supposed to be moved.
 * @returns {object} The player object with adjusted coordinates.
 */
export function movePlayer(player) {
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

/**
 * @description Checks if a player has hit a game ending state.
 * @param {
 *  direction: string,
 *  x_pos: number,
 *  y_pos: number,
 * } player - The player object to check the conditions on.
 * @param {CanvasRenderingContext2D} ctx - The context of the game board.
 * @param {string} color1 - The color of the first player as HexCode.
 * @param {string} color2 - The color of the second player as HexCode.
 * @returns {boolean} whether the player is alive or not.
 */
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

/**
 * @description Resets the environment of the game.
 * @param {
 *  direction: string,
 *  x_pos: number,
 *  y_pos: number,
 *  color: string
 * } player1, player2 - The player objects.
 * @param {string} intervalID - The intervalID of the current game loop.
 * @param {CanvasRenderingContext2D} ctx - The context of the game board.
 */
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
