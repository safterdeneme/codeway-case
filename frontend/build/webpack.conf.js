const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dotenv = require('dotenv').config();

function resolve(dir) {
  return path.join(__dirname, dir);
}

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    fallback: {
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread']
        }
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        VUE_APP_FIREBASE_API_KEY: JSON.stringify(process.env.VUE_APP_FIREBASE_API_KEY),
        VUE_APP_FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.VUE_APP_FIREBASE_AUTH_DOMAIN),
        VUE_APP_FIREBASE_PROJECT_ID: JSON.stringify(process.env.VUE_APP_FIREBASE_PROJECT_ID),
        VUE_APP_FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.VUE_APP_FIREBASE_STORAGE_BUCKET),
        VUE_APP_FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID),
        VUE_APP_FIREBASE_APP_ID: JSON.stringify(process.env.VUE_APP_FIREBASE_APP_ID),
        VUE_APP_FIREBASE_MEASUREMENT_ID: JSON.stringify(process.env.VUE_APP_FIREBASE_MEASUREMENT_ID),
        VUE_APP_API_TOKEN: JSON.stringify(process.env.VUE_APP_API_TOKEN),
      }
    })
  ].concat(
    isProduction
      ? [
          new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
          }),
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
          })
        ]
      : [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
          })
        ]
  ),
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    compress: true,
    port: 8080
  },
  devtool: isProduction ? 'source-map' : 'eval-source-map'
};
