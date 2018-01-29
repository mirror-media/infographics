const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Path = require('path');
const poststylus = require('poststylus');
const autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let pathsToClean = [
  'rent-king'
];

let cleanOptions = {}

module.exports = {
    // devtool: 'source-map',
    entry: {
        app: './js/index.js',
    },
    output: {
        path: `${__dirname}/rent-king`,
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
              // use: [
              //   {
              //       loader: 'style-loader',
              //   },
              //   {
              //       loader: 'css-loader',
              //   },
              //   {
              //       loader: 'stylus-loader',
              //   }
              // ]
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [ 'css-loader', 'stylus-loader' ],
                // minimize: true
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
          sourceMap: false,
          uglifyOptions : {
            compress: {
                warnings: true,
            },
            mangle: true,
          }
        }),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new webpack.LoaderOptionsPlugin({
          options: {
            stylus: {
              use: [poststylus([ 'autoprefixer', 'rucksack-css' ])],
            }
          }
        }),
        new CopyWebpackPlugin([
          { from:'assets', to:'assets' },
          { from:'js', to:'js' }
        ]),
        new OptimizeCssAssetsPlugin()
    ],
    resolve: {
        alias: {
            // 'images': Path.resolve(__dirname, '../images'),
            // 'data': Path.resolve(__dirname, '../data'),
            // 'vdata': Path.resolve('/dev_keith/infographics/mining/vdata'),
        }
    },
};