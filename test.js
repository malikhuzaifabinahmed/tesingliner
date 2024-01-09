function addBiasTerm(X) {
  // Add a bias term to the input data
  return X.map((row) => [1, ...row]);
}
console.log(
  addBiasTerm([
    [1, 2],
    [2, 1],
    [2, 3],
    [3, 5],
    [1, 3],
    [4, 2],
  ])
);
