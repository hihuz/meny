const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => ({
  context: __dirname,
  entry: './src/index.js',
  devtool: env.prod ? 'cheap-module-source-map' : 'eval',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
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
        include: path.resolve(__dirname, 'src'),
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html.ejs'
    }),
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin([
      { from: 'public', to: 'public' },
      { from: 'favicon.ico' },
      { from: '_redirects' }
    ])
  ]
});
