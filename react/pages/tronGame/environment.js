import {
  DIRECTIONS,
  X_START,
  Y_START,
  COLORS,
  CANVAS_WIDTH,
  CANVAS_HEIGHT
} from "./literals.js";
import { ScoreBoard } from "./scoreBoard.js";

export class Environment {
  constructor(player1, player2, canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.player1 = player1;
    this.player2 = player2;
    this.scoreBoard = new ScoreBoard(player1.name, player2.name);
    this.renderPlayer(player1);
    this.renderPlayer(player2);

    //Listen to player input to change directions
    keydownListener.bind(this)();
  }

  step() {
    this.player1.movePlayer();
    this.player2.movePlayer();

    this.player1.healthCheckup(this.ctx, COLORS[this.player2.color]);
    this.player2.healthCheckup(this.ctx, COLORS[this.player1.color]);
  }

  renderPlayer(player) {
    this.ctx.fillStyle = COLORS[player.color];
    this.ctx.fillRect(player.x_pos, player.y_pos, 5, 5);
  }

  reset(player1, player2, intervalID, ctx) {
    const { NONE } = DIRECTIONS;
    console.log("restart called");
    this.player1.setDirection(NONE);
    this.player2.setDirection(NONE);
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.player1.setCoords(X_START, Y_START);
    this.player2.setCoords(X_START, Y_START * 2);
    this.renderPlayer(this.player1);
    this.renderPlayer(this.player2);
  }

  getStateTensor() {
    return tf.tidy(() => {
      const imageData = this.ctx.getImageData(
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      ).data;
      //The original array has an additional alpha channel that we don't need
      //for the learning -> remove the alpha entries
      //Generally, we also don't need to have rgb values, all we care about is
      //if a pixel is blocked or not
      //We can also immediately clip the values to true and false (blocked/!blocked)
      const rgbData = imageData.filter((val, idx) => idx % 4 !== 3);

      const red = [];
      const green = [];
      const blue = [];

      imageData.map((channel, idx) => {
        switch (idx % 4) {
          case 0:
            red.push(channel > 0);
            break;
          case 1:
            green.push(channel > 0);
            break;
          case 2:
            blue.push(channel > 0);
            break;
          default:
            break;
        }

        // Now we have 3 buckets (red, green and blue), each of size
        // CANVAS_WIDTH * CANVAS_HEIGHT with indicators.
        // We can combine the three buckets
        // as we need a Matrix for CNN, we combine them into
        // a matrix of size [CANVAS_HEIGHT, CANVAS_WIDTH]
        const imageMatrix = [];
        for (var i = 0; i < CANVAS_HEIGHT; i++) {
          const row = [];
          for (var j = 0; j < CANVAS_WIDTH; j++) {
            row.push(+(red[i] || green[i] || blue[i])); //NOTE: +true === 1
          }
          imageMatrix.push(row);
        }

        // We can still downsize the input, as each player has a size of
        // 5x5 px --> instead of checking every pixel, it is enough to know if
        // the 5x5 patches are blocked
        const scaledImageMatrix = [];
        for (var i = 0; i < CANVAS_HEIGHT; i = i + 5) {
          const row = [];
          for (var j = 0; j < CANVAS_WIDTH; j = j + 5) {
            row.push(imageData[i][j]);
          }
        }

        return tf
          .tensor2d(scaledImageMatrix)
          .reshape([CANVAS_HEIGHT / 5, CANVAS_WIDTH / 5, 1]);
      });
    });
  }
}

async function keydownListener() {
  const { UP, DOWN, LEFT, RIGHT } = DIRECTIONS;
  document.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    const prevDirectionP1 = this.player1.getDirection();
    const prevDirectionP2 = this.player2.getDirection();
    const keyCode = event.keyCode;
    switch (keyCode) {
      case 38:
        if (prevDirectionP1 !== DOWN) {
          this.player1.setDirection(UP);
        }
        break;
      case 40:
        if (prevDirectionP1 !== UP) {
          this.player1.setDirection(DOWN);
        }
        break;
      case 39:
        if (prevDirectionP1 !== LEFT) {
          this.player1.setDirection(RIGHT);
        }
        break;
      case 37:
        if (prevDirectionP1 !== RIGHT) {
          this.player1.setDirection(LEFT);
        }
        break;
      case 87:
        if (prevDirectionP2 !== DOWN) {
          this.player2.setDirection(UP);
        }
        break;
      case 65:
        if (prevDirectionP2 !== RIGHT) {
          this.player2.setDirection(LEFT);
        }
        break;
      case 68:
        if (prevDirectionP2 !== LEFT) {
          this.player2.setDirection(RIGHT);
        }
        break;
      case 83:
        if (prevDirectionP2 !== UP) {
          this.player2.setDirection(DOWN);
        }
        break;
    }
  });
}
