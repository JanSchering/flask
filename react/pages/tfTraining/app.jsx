//import * as tfvis from "@tensorflow/tfjs-vis";
import {
  convertToTensor,
  trainModel,
  createModel,
  getData
} from "./util.js";
import { testModel } from "./test.js";

async function run() {
  // Load and plot the original input data that we are going to train on.
  const data = await getData();
  const values = data.map(d => ({
    x: d.horsepower,
    y: d.mpg
  }));

  tfvis.render.scatterplot(
    { name: "Horsepower v MPG" },
    { values },
    {
      xLabel: "Horsepower",
      yLabel: "MPG",
      height: 300
    }
  );

  const model = createModel();
  tfvis.show.modelSummary({ name: "Model Summary" }, model);

  // Convert the data to a form we can use for training.
  const tensorData = convertToTensor(data);
  const { inputs, labels } = tensorData;

  // Train the model
  await trainModel(model, inputs, labels);
  console.log("Done Training");

  // Testing the model after the Training is done
  testModel(model, data, tensorData);
}

document.addEventListener("DOMContentLoaded", run);
