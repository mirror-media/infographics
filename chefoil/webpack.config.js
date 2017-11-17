const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPluginConfigFile = [
  { path: 'build/index.html', filename: 'index.html' } ,
  { path: 'build/posts/recipes01/index.html', filename: 'recipes01.html' } ,
  { path: 'build/posts/recipes02/index.html', filename: 'recipes02.html' } ,
  { path: 'build/posts/recipes03/index.html', filename: 'recipes03.html' }
]
const HTMLWebpackPluginConfig = HTMLWebpackPluginConfigFile.map((file) => {
  return new HtmlWebpackPlugin({
    template: `${__dirname}/${file.path}`,
    filename: file.filename,
    inject: 'body',
    minify: {
      conservativeCollapse: true,
      minifyJS: true,
      collapseWhitespace: true,
      removeComments: true,
      collapseInlineTagWhitespace: true
    }
  });
})

const webpack = require('webpack');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const Path = require('path');
const poststylus = require('poststylus');
const autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let pathsToClean = [
  'chefoil'
];

let cleanOptions = {}

module.exports = {
    entry: {
        app: './lib/index.js',
    },
    output: {
        path: `${__dirname}/chefoil`,
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
        ...HTMLWebpackPluginConfig,
    ],
    resolve: {
        alias: {}
    },
};