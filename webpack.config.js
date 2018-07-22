const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const autoprefixer = require("autoprefixer");

module.exports = env => ({
  context: __dirname,
  mode: env.prod ? "production" : "development",
  entry: path.resolve(__dirname, "src/index.js"),
  devtool: env.prod ? "cheap-module-source-map" : "eval",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        include: path.resolve(__dirname, "src"),
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                modules: false,
                loose: true,
                targets: {
                  browsers: ["last 2 versions", "Explorer 11"]
                },
                useBuiltIns: "usage"
              }
            ],
            "@babel/react"
          ],
          plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/syntax-dynamic-import"]
        }
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                autoprefixer({
                  browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"]
                })
              ]
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html.ejs"
    }),
    new MiniCssExtractPlugin({
      filename: "[id].[contenthash:8].css",
      chunkFilename: "[id].[contenthash:8].css"
    }),
    new CopyWebpackPlugin([
      { from: "public", to: "public" },
      { from: "favicon.ico" },
      { from: "_redirects" }
    ]),
    new Dotenv()
  ]
});
