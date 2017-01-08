const path = require('path');

module.exports = env => ({
  context: __dirname,
  entry: './src/index.js',
  devtool: env.prod ? 'cheap-module-source-map' : 'eval',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
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
  }
});
