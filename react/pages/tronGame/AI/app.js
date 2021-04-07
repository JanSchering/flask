import { Model } from "./model";
import { Orchestrator } from "./orchestrator";
import { Memory } from "./memory";
import { UI } from "./visual.js";

/**
 * The role of the policy network is to select an action based on the observed
 * state of the system.
 * There are 4 possible actions to choose from: [UP, DOWN, LEFT, RIGHT],
 * which turn the players' character in the according direction.
 */
class PolicyNetwork {
  constructor(surface) {
    this.surface = surface;
    this.memory = new Memory(500);
    this.p1Model = new Model(100);
    this.p2Model = new Model(100);
  }

  async train(
    discountRate = 0.95,
    numGames = 1000,
    maxStepsPerGame = 500
  ) {
    const orchestrator = new Orchestrator(
      this.surface,
      this.p1Model,
      this.p2Model,
      this.memory,
      discountRate,
      maxStepsPerGame
    );
    for (let i = 0; i < numGames; ++i) {
      await orchestrator.run();
    }
  }
}

function clickListener() {
  this.resolve();
}

const buttonInput = () => {
  return new Promise(resolve => {
    const button = document.getElementById("trainButton");
    button.removeEventListener("click", clickListener);
    button.addEventListener("click", clickListener.bind({ resolve }));
  });
};

async function runApp() {
  const tfVisContainer = tfvis
    .visor()
    .surface({ name: "Game Board", tab: "Input Data" });
  const surface = new UI(tfVisContainer);
  const net = new PolicyNetwork(surface);
  await buttonInput();
  net.train();
}

runApp();
