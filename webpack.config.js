module.exports = {
  entry: {
    app: './src/es6/app.es6'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
