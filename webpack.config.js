const path = require("path");
const ExtractCSS = require("extract-text-webpack-plugin");
const MODE = process.env.WEBPACK_ENV;

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ENTRY_FILE,
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: ExtractCss.extract([
          {
            loader: "css-loader", // webpack이 css를 이해할 수 있도록
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].[format]",
  },
};

module.exports = config;
