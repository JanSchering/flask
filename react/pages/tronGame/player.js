import {
  DIRECTIONS,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  COLORS
} from "./literals";
import { getColorCode } from "./utils";

export class Player {
  constructor(color, name, x_pos, y_pos) {
    this.color = color;
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.name = name;
    this.direction = DIRECTIONS.NONE;
    this.score = 0;
  }

  /**
   * @description Move the player a step in its current direction.
   */
  movePlayer() {
    const { UP, DOWN, LEFT, RIGHT } = DIRECTIONS;
    switch (this.direction) {
      case UP:
        this.y_pos -= 5;
        break;
      case DOWN:
        this.y_pos += 5;
        break;
      case LEFT:
        this.x_pos -= 5;
        break;
      case RIGHT:
        this.x_pos += 5;
        break;
      default:
        break;
    }
  }

  /**
   * @description Checks if the player has hit a game ending state.
   * @returns {boolean} whether the player is alive or not.
   */
  isAlive(ctx, enemyColor) {
    const { NONE } = DIRECTIONS;
    if (this.direction !== NONE) {
      const positionLookAhead = ctx.getImageData(
        this.x_pos,
        this.y_pos,
        1,
        1
      ).data;
      const hex = getColorCode(
        positionLookAhead[0],
        positionLookAhead[1],
        positionLookAhead[2]
      );

      return (
        !(hex === COLORS[this.color]) &&
        !(hex === enemyColor) &&
        this.x_pos >= 0 &&
        this.x_pos < CANVAS_WIDTH &&
        this.y_pos >= 0 &&
        this.y_pos < CANVAS_HEIGHT
      );
    } else {
      return true;
    }
  }

  setColor(color) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  getDirection() {
    return this.direction;
  }

  setCoords(x_pos, y_pos) {
    this.x_pos = x_pos;
    this.y_pos = y_pos;
  }
}
