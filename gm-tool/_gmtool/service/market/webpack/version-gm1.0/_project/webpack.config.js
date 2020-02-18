const os = require('os')
const fs = require('fs')
const path = require('path')

const webpack = require('webpack')
const HappyPack = require('happypack')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const env = process.env.NODE_ENV
const isDev = env === 'development';

const { version } = require('./package.json')
const manifest = require('./build/dll/dll.manifest.json')

console.log(manifest, 'manifest')

console.log('webpack.config.js NODE_ENV', env)

function getDLLFileName() {
  const { hash } = require('./build/dll/dll.version.json')
  const fileNames = fs.readdirSync('./build/dll/');
  return fileNames.find(fileName => fileName.endsWith(`${hash}.dll.bundle.js`));
}

function getConfig(options) {
  const config = {
    mode: env,
    entry: options.index || './js/index.js',
    output: {
      path: path.resolve('build'),
      publicPath: options.publicPath,
      chunkFilename: 'js/[id].[chunkhash:8].bundle.js',
      filename: `js/[name].[${isDev ? 'hash' : 'chunkhash'}:8].bundle.js`,
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          locale: {
            minSize: 0,
            priority: 10,
            name: 'locale',
            chunks: 'initial',
            test: (module) => {
              let { context } = module
              if (!context) {
                return false
              }
              return context.includes('locales') && !context.includes('node_modules')
            }
          },
        }
      }
    },
    resolve: {
      extension: [
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'happypack/loader?id=js',
          ...options.jsModuleRule
        },
        {
          test: /\.(ts|tsx)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(css|less)$/,
          loader: [
            MiniCssExtractPlugin.loader,
            'happypack/loader?id=css'
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'img/[name].[hash:8].[ext]'
            }
          }]
        },
        {
          test: /(fontawesome-webfont|glyphicons-halflings-regular|iconfont)\.(woff|woff2|ttf|eot|svg)($|\?)/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'font/[name].[hash:8].[ext]'
            }
          }]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEBUG__: isDev,
        __VERSION__: JSON.stringify(version)
      }),
      new HappyPack({
        id: 'js',
        threadPool: happyThreadPool,
        loaders: [{
          path: 'babel-loader',
          query: {
            cacheDirectory: true
          }
        }]
      }),
      new HappyPack({
        id: 'css',
        threadPool: happyThreadPool,
        loaders: ['css-loader', 'postcss-loader', 'less-loader']
      }),
      new webpack.DllReferencePlugin({ manifest: require('./build/dll/dll.manifest.json') }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css'
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  }

  if (isDev) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin())

    config.plugins.push(new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template/index.html'
    }))

    config.devServer = {
      hot: true,
      compress: true,
      host: '0.0.0.0',
      contentBase: './',
      port: options.port,
      proxy: options.proxy,
      disableHostCheck: true,
      https: options.https || false,
      publicPath: options.publicPath,
      historyApiFallback: {
        index: options.publicPath + 'index.html'
      },
    }
  } else {

    config.devtool = 'source-map'

    config.plugins.push(new HtmlWebpackPlugin({
      filename: 'index.html',
      commit: process.env.GIT_COMMIT || '',
      branch: process.env.GIT_BRANCH || 'master',
      template: `template/${options.projectShortName}.html`
    }))

    config.optimization = config.optimization || {}
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          mangle: false // Note `mangle.properties` is `false` by default.
        }
      })
    ]
  }

  // 要后于 HtmlWebpackPlugin
  config.plugins.push(new AddAssetHtmlPlugin({
    hash: true,
    outputPath: 'dll',
    includeSourcemap: false,
    publicPath: options.publicPath + 'dll/',
    filepath: path.resolve(`./build/dll/${getDLLFileName()}`)
  }))

  return config;
}

module.exports = getConfig
