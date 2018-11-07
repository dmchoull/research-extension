const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// eslint-disable-next-line no-undef
const PATH = (...args) => path.resolve(__dirname, ...args);

// eslint-disable-next-line no-undef
const PRODUCTION = process.env.NODE_ENV === "production";

const config = {
  entry: {
    background: PATH("./src/background/index.ts"),
    popup: PATH("./src/popup/index.tsx"),
  },
  output: {
    filename: "[name].js",
    path: PATH("./build"),
    chunkFilename: "[id].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: "awesome-typescript-loader",
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ filename: "popup.html", chunks: ["popup"] })],
  devtool: PRODUCTION ? "source-map" : "cheap-module-source-map",
  resolve: {
    modules: [PATH("./src"), PATH("./node_modules")],
    extensions: [".js", ".ts", ".tsx"],
  },
};

module.exports = config;
