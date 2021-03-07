const path = require("path");
const isDevelopment = process.env.NODE_ENV === "development";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const remarkContainer = require("remark-container");

var config = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.mdx?$/,
        use: [
          { loader: "babel-loader" },
          {
            loader: "@mdx-js/loader",
            options: {
              remarkPlugins: [remarkContainer]
            }
          }
        ]
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          isDevelopment
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          isDevelopment
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader" // Or `url-loader` or your other loader
          },
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              severityError: "warning", // Ignore errors on corrupted images
              minimizerOptions: {
                plugins: [
                  ["gifsicle", { interlaced: true }],
                  ["jpegtran", { progressive: true }],
                  ["optipng", { optimizationLevel: 5 }]
                ]
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".mdx", ".scss"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css"
    })
  ]
};

var homeConfig = Object.assign({}, config, {
  entry: {
    index: path.resolve(
      __dirname,
      "react",
      "pages",
      "home",
      "app.jsx"
    )
  },
  output: {
    path: path.resolve(__dirname, "app", "static", "bundles", "home"),
    filename: "bundle.js"
  }
});

var tronGameConfig = Object.assign({}, config, {
  entry: {
    index: path.resolve(
      __dirname,
      "react",
      "pages",
      "tronGame",
      "app.jsx"
    )
  },
  output: {
    path: path.resolve(
      __dirname,
      "app",
      "static",
      "bundles",
      "tronFromScratch"
    ),
    filename: "bundle.js"
  }
});

module.exports = [homeConfig, tronGameConfig];
