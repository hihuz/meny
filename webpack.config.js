const webpack = require('webpack');
const path = require('path');
const webpackValidator = require('webpack-validator');
const {getIfUtils, removeEmpty} = require('webpack-config-utils');

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env);
  const config = webpackValidator({
    context: __dirname,
    entry: {
      app: './src/index.js',
      vendor: ['react','react-dom','react-router']
    },
    devtool: ifProd('cheap-module-source-map','eval'),
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.[name].[chunkhash].js'
    },
    devServer: {
      publicPath: '/dist/',
      historyApiFallback: true
    },
    resolve: {
      extensions: ['.js', '.json']
    },
    stats: {
      colors: true,
      reasons: true,
      chunks: true
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          include: path.resolve(__dirname, 'js'),
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            }
          ]
        }
      ]
    },
    plugins: removeEmpty([
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
      }))
    ]),
  });
  return config;
}
