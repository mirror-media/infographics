const HtmlwebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    // 'webpack-dev-server/client?http://localhost:8008',
    // 'webpack/hot/only-dev-server',
    './app/index.js'
  ],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/projects/kmt-chairman2017/',
    // publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ['transform-runtime'],
              presets: ['es2015']
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          'url-loader?limit=1024&name=images/[name].[ext]'
        ]
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  plugins: [
      // new webpack.HotModuleReplacementPlugin(),
      new HtmlwebpackPlugin({
        template: 'app/index.html'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress:{
          warnings: true
        }
      }),
  ],
  // devServer: {
  //   inline: true,
  //   port: 8008,
  //   hot: true,
  //   publicPath: '/'
  // },
};