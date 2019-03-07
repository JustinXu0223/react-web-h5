/* eslint import/no-dynamic-require: 0 */
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // copy
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const HappyPack = require('happypack');
const os = require('os'); // node 提供的系统操作模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const utils = require('./webpack.util.js');
const config = require('./webpack.config');

// 根据我的系统的内核数量 指定线程池个数 也可以其他数量
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const {
  NODE_ENV,
  BABEL_ENV,
  OUTPUT_DIR = '',
} = process.env;

const isProd = NODE_ENV === 'production';

const themeVariables = lessToJs(fs.readFileSync(utils.resolvePath('./config/ant-theme-vars.less'), 'utf8'));

module.exports = {
  entry: ['@babel/polyfill', utils.resolvePath('./src/index.js')],
  output: {
    path: utils.resolvePath(OUTPUT_DIR),
    publicPath: '/',
    filename: isProd ? 'js/[name].[chunkhash:8].js' : '[name].js',
    chunkFilename: isProd ? 'js/[name].[chunkhash:8].js' : '[name].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  resolve: {
    modules: [
      utils.resolvePath('node_modules'),
    ],
    extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    alias: {
      assets: utils.resolvePath('src/assets'),
      components: utils.resolvePath('src/components'),
      config: utils.resolvePath('src/config'),
      constants: utils.resolvePath('src/constants'),
      mock: utils.resolvePath('src/mock'),
      models: utils.resolvePath('src/models'),
      pages: utils.resolvePath('src/pages'),
      services: utils.resolvePath('src/services'),
      styles: utils.resolvePath('src/styles'),
      utils: utils.resolvePath('src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader?cacheDirectory',
        ],
      },
      {
        test: /\.css$/,
        exclude: /src/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer,
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer,
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: themeVariables,
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HappyPack({ // 基础参数设置
      id: 'babel', // 上面loader?后面指定的id
      loaders: ['babel-loader?cacheDirectory'], // 实际匹配处理的loader
      threadPool: happyThreadPool,
      verbose: true,
    }),
    new webpack.DllReferencePlugin({
      manifest: require(`../${config.DIST_DLL_OUTPUT}/${config.DIST_DLL_JSON_NAME}${config.DIST_DLL_JSON_SUFFIX}`),
    }),
    new CopyWebpackPlugin([
      {
        from: utils.resolvePath('./public'),
        to: '',
        force: true,
        ignore: ['*.html'],
      },
      {
        from: utils.resolvePath(config.DIST_DLL_OUTPUT),
        to: '',
        force: true,
      },
    ]),
    new HtmlWebpackPlugin({
      template: utils.resolvePath('public/index.html'),
      filename: 'index.html',
      // 要把script插入到标签里
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new HtmlIncludeAssetsPlugin({
      assets: ['react.dll.js'], //  添加的资源相对html的路径
      append: false, // false 在其他资源的之前添加 true 在其他资源之后添加
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        BABEL_ENV: JSON.stringify(BABEL_ENV),
      },
    }),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
};
