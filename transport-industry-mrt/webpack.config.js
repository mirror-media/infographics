const HtmlwebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    'babel-polyfill',
    './app/index.js'
  ],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
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
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
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
      }
    ]
  },
  plugins: [
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
  // }
}
