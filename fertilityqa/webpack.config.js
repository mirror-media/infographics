const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/index.html`,
  filename: 'index.html',
  inject: 'body',
  minify: {
    conservativeCollapse: true,
    minifyJS: true,
    collapseWhitespace: true,
    removeComments: true,
    collapseInlineTagWhitespace: true
  }
});

const webpack = require('webpack');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const Path = require('path');
const poststylus = require('poststylus');
const autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let pathsToClean = [
  'fertilityqa'
];

let cleanOptions = {}

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        path: `${__dirname}/fertilityqa`,
        filename: '[name].[hash].js',
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
        HTMLWebpackPluginConfig,
        new webpack.optimize.UglifyJsPlugin({
          uglifyOptions : {
            compress: {
                warnings: true,
            },
            mangle: false,
          }
        }),
        new ExtractTextPlugin({
          filename: '[name]-[chunkhash].css',
        }),
        new CopyWebpackPlugin([
          { from:'css', to:'css' },
          { from:'js', to:'js' }, 
          { from:'images', to:'images' }
        ]),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new webpack.LoaderOptionsPlugin({
          options: {
            stylus: {
              use: [poststylus([ 'autoprefixer', 'rucksack-css' ])]
            }
          }
        }),
        new OptimizeCssAssetsPlugin(),
        
    ],
    resolve: {
        alias: {}
    },
};