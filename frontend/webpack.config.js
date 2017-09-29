'use strict';

const HtmlPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const {DefinePlugin, EnvironmentPlugin} = require('webpack');

require('dotenv').config();
let production = process.env.NODE_ENV === 'production';

let plugins = [
  new HtmlPlugin({template: `${__dirname}/src/index.html`}),
  new ExtractPlugin('bundle-[hash].css'),
  new EnvironmentPlugin(['NODE_ENV']),
  new DefinePlugin({
    __DEBUG__: JSON.stringify(!production),
    __API_URL__: JSON.stringify(process.env.API_URL),
    __GOOGLE_CLIENT_ID__: JSON.stringify(process.env.GOOGLE_CLIENT_ID)

  })
];

if(production) {
  plugins = [...plugins, new CleanPlugin, new UglifyPlugin];
}

module.exports = {
  devtool: production ? undefined : 'inline-source-map',
  entry: `${__dirname}/src/main.js`,
  devServer: {
    historyApiFallback: true
  },
  plugins,
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle-[hash].js',
    publicPath: process.env.CDN_URL
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.(woff|woff2|ttf|eot|glyph|\.svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'font/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png|tiff|svg)$/,
        exclude: /\.glyph.svg/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 6000,
              name: 'image/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp3|aac|aiff|wav|flac|m4a|mp4|ogg)$/,
        exclude: /\.glyph.svg/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'audio/[name].[ext]' }
          }
        ]
      }
    ]
  }
};
