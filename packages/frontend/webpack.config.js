const path = require("path");
const Dotenv = require("dotenv-webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { BaseHrefWebpackPlugin } = require("base-href-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  mode: isDev ? "development" : "production",
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "tsconfig.json"),
      }),
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      minify: !isDev,
    }),
    new BaseHrefWebpackPlugin({ baseHref: "/" }),
    new CleanWebpackPlugin(),
    new VanillaExtractPlugin(),
    new MiniCssExtractPlugin(),
    new Dotenv(),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  devtool: isDev && "source-map",
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.ts$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript"],
            plugins: [
              ["@babel/plugin-proposal-decorators", { version: "legacy" }],
              ["@babel/plugin-proposal-class-properties", { loose: false }],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
        ],
      },
    ],
  },
};
