const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const webpack = require('webpack')

module.exports = {
  entry: './scripts/index.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ['transform-runtime']
            }
          }
        ],
        exclude: /node_modules/
      },
      { 
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: [{
            loader: 'style-loader',
          }],
          use: [
            'css-loader',
            'postcss-loader',
            'stylus-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(mp3|m4a)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(mp4)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin([ 'dist' ], {}),
    new HtmlwebpackPlugin({
      template: `${__dirname}/index.html`
    }),
    new ExtractTextPlugin('styles.css')
  ],
  devServer: {
    inline: true,
    port: 8008,
    hot: true
  }
};