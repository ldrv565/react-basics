/* eslint-disable */
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const root = path.resolve(__dirname, '../');

module.exports = (env) => {
  const devtool = env && env.production ? 'none' : 'cheap-module-source-map';
  const mode = env && env.production ? 'production' : 'development';

  return {
    bail: true,
    entry: ['@babel/polyfill', './src/_app/app.jsx'],
    devServer: {
      historyApiFallback: true,
      contentBase: './build',
      hot: true,
    },
    devtool,
    mode,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: "eslint-loader",
              options: {
                emitWarning: true,
                configFile: "./.eslintrc.js"
                }
            }
          ],
        },
        {
          test: /\.(scss|css)$/,
          use: [
            mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => autoprefixer,
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              },
            },
          ],
        }, {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        components: path.join(root, 'src/_common/components/components.js'),
        helpers: path.join(root, 'src/helpers'),
      },
      modules: [
        path.resolve(root, 'src'),
        'node_modules',
      ],
      extensions: [
        '.js',
        '.jsx',
        '.css',
        '.scss',
      ],
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          exclude: /node_modules/,
        }),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/_app/static/index.html',
        filename: './index.html',
      }),
      new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css' }),
      new OptimizeCssAssetsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
      filename: '[name].js',
      path: path.resolve(root, 'build'),
      publicPath: '/',
    },
  };
};

