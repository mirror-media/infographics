const _ = require('lodash')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const targetHtmls = [
//   'chen-wan-ting',
//   'chen-yan-yu',
//   'chen-shi-jie'
// ]

// const fileInfo = { src: 'chen-shi-jie', name: 'universiade2017-chenshihchieh' }
const fileInfo = { src: 'chen-jie', name: 'universiade2017-chenchieh' }
// const fileInfo = { src: 'chen-yan-yu', name: 'universiade2017-chenyenyu' }
// const fileInfo = { src: 'gong-yun', name: 'universiade2017-kungyun' }
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/build/posts/${fileInfo.src}/index.html`,
  filename: 'index.html',
  inject: 'body',
});
// const fileInfo = { name: 'universiade2017' }
// const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: `${__dirname}/build/index.html`,
//   filename: 'index.html',
//   inject: 'body',
// });
// const HTMLWebpackPluginConfigs = _.map(targetHtmls, (t) => {
//   return new HtmlWebpackPlugin({
//     template: `${__dirname}/build/posts/${t}/index.html`,
//     filename: `${t}.html`,
//     inject: 'body',
//   })
// })

const webpack = require('webpack');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const Path = require('path');
const poststylus = require('poststylus');
const autoprefixer = require('autoprefixer');

let pathsToClean = [ fileInfo.name ];

let cleanOptions = {}

module.exports = {
    entry: {
        app: './js/index.js',
    },
    output: {
        path: `${__dirname}/${fileInfo.name}`,
        // publicPath: '/dev_keith/infographics/mining/mining/',//`/projects/mining/`,
        // filename: '[name].js', // '[name].[hash].js', //
        filename: '[name].[hash].js',//'[name].js',//
    },
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['es2015', 'stage-0']
                }
              }
            },          
            {
              test: /\.styl$/,
              exclude: /node_modules/,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [ 'css-loader', 'stylus-loader' ]
              })
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
              test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
              use: [
                {
                  loader: 'file-loader'
                }
              ]
            }
        ]
    },
    devServer: {
        inline: true,
        port: 8008,
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[name]-[chunkhash].css',
      }),
      HTMLWebpackPluginConfig,
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: true
          }
      }),
      new CleanWebpackPlugin(pathsToClean, cleanOptions),
      new webpack.LoaderOptionsPlugin({
        options: {
          stylus: {
            use: [poststylus([ 'autoprefixer', 'rucksack-css' ])]
          }
        }
      }),
      new CopyWebpackPlugin([
        { from:'assets', to:'assets' } 
      ]),
    ],
    // , ...HTMLWebpackPluginConfigs],
    resolve: {
        alias: {
            // 'images': Path.resolve(__dirname, '../images'),
            // 'data': Path.resolve(__dirname, '../data'),
            // 'vdata': Path.resolve('/dev_keith/infographics/mining/vdata'),
        }
    },
};