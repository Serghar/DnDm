var webpack = require('webpack');

module.exports = {
  entry: {
  app: ['webpack/hot/dev-server', './app/src/index.js'],
},
output: {
  path: __dirname + '/app/src',
  filename: 'bundle.js',
  publicPath: 'http://localhost:5000'
},
devServer: {
  contentBase: './src',
  publicPath: 'http://localhost:5000'
},
module: {
 loaders: [
   { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
 ]
},
 plugins: [
   new webpack.HotModuleReplacementPlugin()
 ]
}