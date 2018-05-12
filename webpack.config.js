const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'front'),
  entry: {
    index: './index.js'
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.js$/,
        use:
          [{
            loader: 'babel-loader',
            options: {
              presets: ['env']
            },
          }, {
            loader: "angularjs-template-loader"
          }]
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img/'
        }
      }
    ]
  },

  resolve: {
    modules: ['node_modules', path.resolve('pictures')]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.ProvidePlugin({
      $: "jquery/dist/jquery.min.js",
      jQuery: "jquery/dist/jquery.min.js",
      "window.jQuery": "jquery/dist/jquery.min.js"
    }),
    new HtmlPlugin({
      template: './index.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/dist/'
  },

  devServer: {
    host: '0.0.0.0',
    port: 7777,
    contentBase: path.join(__dirname, '/dist/')
  }
}