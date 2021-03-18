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
    this.alive = true;
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

  healthCheckup(ctx, enemyColor) {
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

      this.alive =
        !(hex === COLORS[this.color]) &&
        !(hex === enemyColor) &&
        this.x_pos >= 0 &&
        this.x_pos < CANVAS_WIDTH &&
        this.y_pos >= 0 &&
        this.y_pos < CANVAS_HEIGHT;
    } else {
      this.alive = true;
    }
  }

  /**
   * @description Checks if the player has hit a game ending state.
   * @returns {boolean} whether the player is alive or not.
   */
  isAlive() {
    return this.alive;
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

  /**
   * @description Set direction according to UDLR principle
   */
  setDirectionNumeric(numericDirection) {
    const { UP, DOWN, LEFT, RIGHT } = DIRECTIONS;
    switch (numericDirection) {
      case 0:
        if (this.direction !== DOWN) this.direction = UP;
        break;
      case 1:
        if (this.direction !== UP) this.direction = DOWN;
        break;
      case 2:
        if (this.direction !== RIGHT) this.direction = LEFT;
        break;
      case 3:
        if (this.direction !== LEFT) this.direction = RIGHT;
        break;
    }
  }

  getDirection() {
    return this.direction;
  }

  incrementScore() {
    this.score++;
  }

  setCoords(x_pos, y_pos) {
    this.x_pos = x_pos;
    this.y_pos = y_pos;
  }
}
