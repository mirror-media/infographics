const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
}

module.exports = {
  entry: {
    app: [ PATHS.app ],
  },
  output: {
    path: PATHS.build,
    filename: '[name].[hash:8].js',
  },
  module: {
    rules: [
      { 
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: [{
            loader: 'style-loader',
          }],
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([
                  require('autoprefixer'),
                ]),
              },
            },
            'stylus-loader'
          ]
        })
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015'],
            },
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          failOnWarning: false,
          quiet: true,
        }
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name]_[hash:8].[ext]'
          }
        }],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'figure:src', 'link:href']
          }
        }
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'app/data', to: 'data' }
    ]),
    new HtmlWebpackPlugin({
      inject: true,
      template: `${__dirname}/index.html`
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    // host: '10.96.100.64',
    host: 'localhost',
    port: 8088,
    overlay: {
      errors: true,
      warnings: true,
    },
  }
}