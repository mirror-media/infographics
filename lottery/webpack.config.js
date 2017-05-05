const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/index.html`,
    filename: 'index.html',
    inject: 'body',
});
const webpack = require('webpack');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const Path = require('path');
const poststylus = require('poststylus');
const autoprefixer = require('autoprefixer');

let pathsToClean = [
  'lottery'
];

let cleanOptions = {}

module.exports = {
    entry: {
        app: './js/index.js',
    },
    output: {
        path: `${__dirname}/lottery`,
        publicPath: `/projects/lottery/`,
        // filename: '[name].js', // '[name].[hash].js', //
        filename: '[name].[hash].js',//'[name].js',//
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0'],
                },
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.styl$/,
                loaders: ["style-loader", "css-loader", "stylus-loader"]
            },
            { test: /\.css$/, 
              loaders: [
                  'style-loader',
                  'css-loader?importLoaders=1',
                  'postcss-loader'
                ] 
            },
            { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: "file" },
        ],
    },
    devServer: {
        inline: true,
        port: 8008,
    },
    plugins: [
        HTMLWebpackPluginConfig,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
        new CleanWebpackPlugin(pathsToClean, cleanOptions)
    ],
    resolve: {
        alias: {
            'images': Path.resolve(__dirname, '../images'),
            'data': Path.resolve(__dirname, '../data'),
        }
    },
    postcss: () => {
      return [
        require('precss'),
        require('autoprefixer')({
          browsers: ['last 7 versions']
        })
      ];
    },
    stylus: {
      use: [
        poststylus([ 
          'autoprefixer', 
          'rucksack-css' 
        ])
      ]
    }
};