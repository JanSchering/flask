const path = require("path");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "react", "test.jsx")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.mdx?$/,
        use: ["babel-loader", "@mdx-js/loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: path.resolve(__dirname, "app", "static", "reactTest")
  }
};
