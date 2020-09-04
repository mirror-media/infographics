const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devServer: {
    compress: true,
    port: 8080,
    contentBase: path.join('./public/')
  }
})
