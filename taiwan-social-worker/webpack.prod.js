const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const { resolve } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  plugins: [
    new CopyPlugin([
      { from: resolve('./public/'), to: resolve('./dist/'), ignore: ['*.html'] }
    ]),
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
})
