const { resolve } = require('path')

const sveltePreprocess = require('svelte-preprocess')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const svgToMiniDataURI = require('mini-svg-data-uri')

const devMode = (process.env.NODE_ENV === 'development')
const transpileDependencies = [
  'svelte'
]

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: devMode ? 'cheap-module-eval-source-map' : 'source-map',
  entry: './src/main.js',
  output: {
    path: resolve('./dist/'),
    publicPath: devMode ? '/' : '/projects/taiwansocialworker/',
    filename: devMode ? 'js/[name].js' : 'js/[name].[contenthash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/i,
        exclude: devMode ? /node_modules/ : new RegExp(`node_modules/(?!(${transpileDependencies.join('|')})/).*`, 'i'),
        use: ['babel-loader']
      },
      {
        test: /\.(html|svelte)$/i,
        use: [
          'babel-loader',
          {
            loader: 'svelte-loader',
            options: {
              emitCss: true,
              hotReload: devMode,
              preprocess: sveltePreprocess({
                scss: {
                  renderSync: true
                },
                postcss: true
              })
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: devMode
            }
          }
        ],
        include: [resolve('./src/')]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        // 若有引入不在 ./src/ 路徑的 css 檔（如 node_modules），需在此加入新路徑
        include: [resolve('./src/'), resolve('./node_modules/normalize.css/')]
      },
      {
        enforce: 'pre',
        test: /\.js$/i,
        include: [resolve('./src/')],
        loader: 'eslint-loader'
      },
      {
        test: /\.(|png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'img',
              name: devMode ? '[name].[ext]' : '[name].[contenthash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              generator: (content) => svgToMiniDataURI(content.toString()),
              outputPath: 'img',
              name: devMode ? '[name].[ext]' : '[name].[contenthash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|ttf|otf)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
          name: devMode ? '[name].[ext]' : '[name].[contenthash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[contenthash:8].css'
    }),
    new HtmlWebpackPlugin({
      title: '我們不是神：台灣社工怎麼了？',
      template: resolve('./public/index.html'),
      filename: 'index.html'
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        chunks: 'all',
        common: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
          priority: 1
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
          priority: 2,
          enforce: true
        }
      }
    }
  },
  resolve: {
    alias: {
      svelte: resolve('./node_modules/svelte/')
    },
    mainFields: ['svelte', 'browser', 'module', 'main']
  }
}
