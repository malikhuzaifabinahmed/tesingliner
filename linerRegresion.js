class LinearRegression {
  constructor(X, y) {
    /**
     * Linear regression constructor.
     *
     * @param {Array} X - The input data.
     * @param {Array} y - The target values.
     */

    this.X = this.addBiasTerm(X);
    this.y = y.map((value) => [value]); // Convert y to column vector

    // Initialize weights
    this.weights = Array.from({ length: this.X[0].length }, () => 0);
  }

  addBiasTerm(X) {
    // Add a bias term to the input data
    return X.map((row) => [1, ...row]);
  }

  predict(X) {
    /**
     * Predict target values for the given input.
     *
     * @param {Array} X - The input data for prediction.
     * @returns {Array} - Predicted target values.
     */
    X = this.addBiasTerm(X);

    // Make predictions
    const predictions = X.map((row) => this.dotProduct(row, this.weights));

    return predictions;
  }

  train(learningRate = 0.01, numEpochs = 1000) {
    /**
     * Train the linear regression model using gradient descent.
     *
     * @param {number} learningRate - The learning rate for gradient descent.
     * @param {number} numEpochs - The number of training epochs.
     */
    for (let epoch = 0; epoch < numEpochs; epoch++) {
      // Compute predictions
      const predictions = this.X.map((row) =>
        this.dotProduct(row, this.weights)
      );

      // Compute error
      const error = predictions.map(
        (prediction, i) => prediction - this.y[i][0]
      );

      // Compute gradient
      const gradient = this.computeGradient(error);

      // Update weights using gradient descent
      this.weights = this.weights.map(
        (weight, i) => weight - learningRate * gradient[i]
      );
    }
  }

  dotProduct(a, b) {
    // Compute dot product of two vectors
    return a.reduce((sum, value, i) => sum + value * b[i], 0);
  }

  computeGradient(error) {
    // Compute gradient
    const gradient = Array.from({ length: this.weights.length }, () => 0);

    for (let i = 0; i < this.X.length; i++) {
      for (let j = 0; j < this.weights.length; j++) {
        gradient[j] += error[i] * this.X[i][j];
      }
    }

    // Normalize by the number of samples
    return gradient.map((value) => value / this.y.length);
  }
}

module.exports = { LinearRegression };
