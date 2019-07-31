'use strict'

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    app: [
      path.join(__dirname, 'app/index.js'),
      path.join(__dirname, 'app/styles/styles.scss')
    ],
    vendor: [
      'babel-polyfill'
    ]
  },
  output: {
    path: path.join(__dirname, '/public/'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'app/styles/'),
      '@components': path.resolve(__dirname, 'app/common.components/'),
      '@uiparts': path.resolve(__dirname, 'app/common.ui.parts/'),
      '@utils': path.resolve(__dirname, 'app/utils/'),
      '@views': path.resolve(__dirname, 'app/views/'),
      '@globals': path.resolve(__dirname, 'app/globals/'),
      '@stores': path.resolve(__dirname, 'app/stores/'),
      '@api': path.resolve(__dirname, 'app/api/')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

  ],
  module: {
    //  add postcss + autoprefixer
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: '..' // use relative urls
            }
          }
        ]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        // exclude: /images/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '../fonts/' // use relative urls
            }
          }
        ]
      }
    ]
  }
}
