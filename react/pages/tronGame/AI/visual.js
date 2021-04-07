import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../literals";

export class UI {
  constructor(surface) {
    this.surface = surface;
    this.gameBoard = this.createGameBoard();
    this.learnBoard = this.createLearnBoard();
  }

  createGameBoard() {
    console.log("creating game board");
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = CANVAS_WIDTH;
    gameCanvas.height = CANVAS_HEIGHT;
    this.surface.drawArea.appendChild(gameCanvas);
    return gameCanvas;
  }

  createLearnBoard() {
    const learnCanvas = document.createElement("canvas");
    learnCanvas.width = CANVAS_WIDTH / 5;
    learnCanvas.height = CANVAS_HEIGHT / 5;
    this.surface.drawArea.appendChild(learnCanvas);
    return learnCanvas;
  }

  async updateLearnBoard(stateTensor) {
    await tf.browser.toPixels(stateTensor, this.learnBoard);
  }
}
