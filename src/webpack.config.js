const path = require('path'), webpack = require('webpack'),
      riot = require('riot-compiler'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

riot.parsers.js.ts = require('./utils/riot-ts');


module.exports = (env) => {

  env = env || process.env;

  const isDev = env.NODE_ENV == 'development';
  const envPreset = ['@babel/env', {
      useBuiltIns: 'usage',
      corejs: 3
  }];
  const babelOptions = isDev ? {} : { presets: [envPreset] };
  // presets run in reverse order: typescript strips the types before preset-env sees them
  const tsOptions = { presets: [envPreset, ['@babel/preset-typescript', {}]] };

  return {
    mode: isDev ? 'development' : 'production',
    devtool: isDev && 'inline-source-map',

    entry: {
      index: './src/index.ts',
    },

    output: {
      filename: '[name].chunk.js?[hash]',
      path: path.resolve(__dirname, '../build'),
      sourceMapFilename: '[file].map?[hash]'
    },

    resolve: {
      modules: [ 'node_modules', __dirname ],
      extensions: [ '.ts', '.js' ]
    },

    plugins: [

      // Common
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require("./package.json").version)
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

        // TypeScript
        {
          test: /\.ts$/,
          use: {
            loader: 'babel-loader',
            options: tsOptions
          }
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
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            // quietDeps: don't repeat deprecations coming from node_modules
            {loader: 'sass-loader', options: {quietDeps: true}},
          ]
        },

        // Files
        { test: /\.(ttf|eot|woff|woff2|mp3|ogg|svg|png)(\?.*)?$/, use: "file-loader" }

      ]
    }
  }

};
