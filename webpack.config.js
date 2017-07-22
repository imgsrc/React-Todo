const path = require('path');

module.exports = {
  entry: './src/App.jsx',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.sass?$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },


  devServer: {
    proxy: {
      "/api": "http://localhost:3000"
    }
  },

  devtool: 'cheap-eval-source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  }
};