const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/index.html`,
  filename: 'index.html',
  inject: 'body',
});
const webpack = require('webpack');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const Path = require('path');

module.exports = {
  entry: {
    app: './js/index.js',
  },
  output: {
    path: `${__dirname}/valentines_day`,
    filename: '[name].[hash].js',//'[name].js',//'[name].js',//
    // filename: '[name].js',//'[name].[hash].js',//'[name].js',//
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      { test:/\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: "file" },
    ],
  },
  devServer: {
    inline: true,
    port: 8008,
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    }),
  ],
  resolve: {
  },
};
