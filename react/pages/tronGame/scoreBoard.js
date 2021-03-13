export class ScoreBoard {
  constructor(p1Name, p2Name) {
    this.board = document.getElementById("scoreBoard");
    this.p1Node = createPlayerNode(p1Name);
    this.p2Node = createPlayerNode(p2Name);
    this.addNodesToBoard(this.p1Node, this.p2Node);
  }

  addNodesToBoard(...nodes) {
    nodes.forEach(node => {
      this.addNodeToBoard(node);
    });
  }

  addNodeToBoard(node) {
    this.board.appendChild(node);
  }

  updatep1Score(score) {
    this.p1Node.querySelector(
      "[id='score']"
    ).textContent = score.toString();
  }

  updatep2Score(score) {
    this.p2Node.querySelector(
      "[id='score']"
    ).textContent = score.toString();
  }
}

const createPlayerNode = name => {
  const container = document.createElement("p");
  const nameNode = document.createElement("span");
  nameNode.textContent = `${name}: `;
  container.appendChild(nameNode);
  const scoreNode = document.createElement("span");
  scoreNode.id = "score";
  scoreNode.textContent = "0";
  container.appendChild(scoreNode);
  return container;
};
