const path = require('path'), webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = (env) => {

  env = env || process.env;

  const isDev = env.NODE_ENV == 'development';
  const babelOptions = isDev ? {} : {
      presets: [
        ['@babel/env', {
          useBuiltIns: 'usage',
          corejs: 3
        }]
      ]
  };

  return {
    mode: isDev ? 'development' : 'production',
    devtool: isDev && 'inline-source-map',

    entry: {
      index: './src/index.coffee',
    },

    output: {
      filename: '[name].chunk.js?[hash]',
      path: path.resolve(__dirname, '../build'),
      sourceMapFilename: '[file].map?[hash]'
    },

    resolve: {
      modules: [ 'node_modules', __dirname ],
      extensions: [ '.js', '.coffee' ]
    },

    plugins: [

      // Common
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require("../package.json").version)
      }),
      new HtmlWebpackPlugin({
          alwaysWriteToDisk: true,
          template: "src/index.html"
      }),
      new HtmlWebpackHarddiskPlugin()

    ].concat(isDev ? [

      // Develop
      new webpack.HotModuleReplacementPlugin()


    ] : [

    ]),

    devServer: {
      open: true,
      hot: true,
      host: 'localhost',
    },

    module: {

      rules: [

        // CoffeeScript
        {
          test: /\.coffee$/,
          use:  [
            {
              loader: 'coffee-loader',
              options: isDev ? {} : { transpile: babelOptions }
            }
          ]
        },

        // Riot HTML tags
        {
          test: /\.tag.html$/,
          use: (isDev ? [] : [
            {
              loader: 'babel-loader',
              options: babelOptions
            }
          ]).concat([
            {
              loader: 'riot-tag-loader',
              options: {hot: isDev, sourcemap: isDev}
            }
          ])
        },

        // Sass
        {
          test: /\.(scss|sass)$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },

        // Files
        { test: /\.(ttf|eot|woff|woff2|mp3|ogg|svg|png)(\?.*)?$/, use: "file-loader" }

      ]
    }
  }

};
