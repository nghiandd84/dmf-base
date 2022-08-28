const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const deps = require('./package.json').dependencies;
const federationConfig = require('./federation.config.json');
const rd = Math.floor(Math.random() * 10000);
module.exports = (env, argv) => {
  const envData = env.env || 'local';
  const config = {
    output: {
      // publicPath: "http://localhost:3000/",
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },

    devServer: {
      port: 3000,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },

    plugins: [
      new Dotenv({
        path: './env/' + envData + '.env',
      }),
      new ModuleFederationPlugin({
        ...federationConfig,
        filename: 'remoteEntry.js',
        remotes: {
          dmf_ui:
            'dmf_ui@https://nghiandd84.github.io/dmf-ui/remoteEntry.js?rd=' +
            rd,
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
      }),
    ],
  };
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }
  return config;
};
