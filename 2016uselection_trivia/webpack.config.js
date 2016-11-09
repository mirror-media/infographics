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
    vendor: ['gsap', 'scrollmagic'],
  },
  output: {
    path: `${__dirname}/2016uselection_trivia`,
    filename: '[name].js',//'[name].[hash].js',
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
      // { test: /\.js/, loader: 'imports?define=>false'},
      {
        test: /\.less$/,
        loader: "style!css!less"
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
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    }),
  ],
  resolve: {
    alias: {
        "TweenLite": Path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
        "TweenMax": Path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
        "TimelineLite": Path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
        "TimelineMax": Path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
        "ScrollMagic": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        "animation.gsap": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        "debug.addIndicators": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    }
  },
};
