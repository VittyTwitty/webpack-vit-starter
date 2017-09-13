const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    vendor: ["jquery"],
    index: './scripts/index.js'
  },
  output: {
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader',
          {loader: 'css-loader', options: {modules: true}}
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [require('autoprefixer')];
                }
              }
            },
            'sass-loader']
        })
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        use: ['url-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles/styles.css"),
    new CopyWebpackPlugin([
      {from: 'assets/**/*'}
    ]),
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: './index.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      // filename: "vendor.js"
      // (Give the chunk a different name)

      minChunks: Infinity,
      // (with more entries, this ensures that no other module
      //  goes into the vendor chunk)
    })
  ]

};
