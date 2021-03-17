import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../literals";

export class Model {
  constructor(batchSize) {
    this.numActions = 4;
    this.batchSize = batchSize;
    this.defineModel();
  }

  predict(states) {
    return tf.tidy(() => this.network.predict(states));
  }

  /**
   * @param {tf.Tensor[]} xBatch
   * @param {tf.Tensor[]} yBatch
   */
  async train(xBatch, yBatch) {
    await this.network.fit(xBatch, yBatch);
  }

  chooseAction(state, eps) {
    return tf.tidy(() => {
      const logits = this.network.predict(state);
      const sigmoid = tf.sigmoid(logits);
      const probs = tf.div(sigmoid, tf.sum(sigmoid));
      return tf.multinomial(probs, 1).dataSync()[0];
    });
  }

  defineModel() {
    this.network = tf.sequential();

    const IMAGE_WIDTH = CANVAS_WIDTH / 5;
    const IMAGE_HEIGHT = CANVAS_HEIGHT / 5;
    const IMAGE_CHANNELS = 1;

    // In the first layer of our convolutional neural network we have
    // to specify the input shape. Then we specify some parameters for
    // the convolution operation that takes place in this layer.
    this.network.add(
      tf.layers.conv2d({
        inputShape: [IMAGE_HEIGHT, IMAGE_WIDTH, IMAGE_CHANNELS],
        kernelSize: 5,
        filters: 8,
        strides: 1,
        activation: "relu",
        kernelInitializer: "glorotNormal"
      })
    );

    // The MaxPooling layer acts as a sort of downsampling using max values
    // in a region instead of averaging.
    this.network.add(
      tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] })
    );

    // Repeat another conv2d + maxPooling stack.
    // Note that we have more filters in the convolution.
    this.network.add(
      tf.layers.conv2d({
        kernelSize: 5,
        filters: 16,
        strides: 1,
        activation: "relu",
        kernelInitializer: "glorotNormal"
      })
    );
    this.network.add(
      tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] })
    );

    // Now we flatten the output from the 2D filters into a 1D vector to prepare
    // it for input into our last layer. This is common practice when feeding
    // higher dimensional data to a final classification output layer.
    this.network.add(tf.layers.flatten());

    // Last layer is a dense layer which has 4 output units, one for each
    // output class:
    // 0 => UP
    // 1 => DOWN
    // 2 => LEFT
    // 3 => RIGHT
    const NUM_OUTPUT_CLASSES = 4;
    this.network.add(
      tf.layers.dense({
        units: NUM_OUTPUT_CLASSES,
        kernelInitializer: "glorotNormal",
        activation: "softmax"
      })
    );

    // Choose an optimizer, loss function and accuracy metric,
    // then compile and return the model
    const optimizer = tf.train.adam();
    this.network.compile({
      optimizer: optimizer,
      loss: "meanSquaredError",
      metrics: ["accuracy"]
    });
  }
}
