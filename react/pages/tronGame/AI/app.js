import { Model } from "./model";
import { Orchestrator } from "./orchestrator";
import { Memory } from "./memory";

/**
 * The role of the policy network is to select an action based on the observed
 * state of the system.
 * There are 4 possible actions to choose from: [UP, DOWN, LEFT, RIGHT],
 * which turn the players' character in the according direction.
 */
class PolicyNetwork {
  constructor() {
    this.memory = new Memory(500);
    this.p1Model = new Model(100);
    this.p2Model = new Model(100);
  }

  async train(
    discountRate = 0.95,
    numGames = 100,
    maxStepsPerGame = 500
  ) {
    for (let i = 0; i < numGames; ++i) {
      const orchestrator = new Orchestrator(
        this.p1Model,
        this.p2Model,
        this.memory,
        discountRate,
        maxStepsPerGame
      );
      await orchestrator.run();
    }
  }
}

const net = new PolicyNetwork();
net.train();
