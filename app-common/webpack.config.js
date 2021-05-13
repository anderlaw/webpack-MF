const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin}  = require('webpack').container;
const path = require("path");

module.exports = {
  entry: "/index.js",
  mode: process.env.NODE_ENV,
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3002,
  },
  output: {
    publicPath: "/app-common",
    clean:true
  },
  resolve:{
    extensions: ['.jsx', '.js', '.json','.css','.scss','.jpg','jpeg','png',],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.js$/,
        loader: 'bundle-loader',
        options: {
          lazy: true,
        },
      },
      {
        test:/\.(jpg|png|gif|jpeg)$/,
        loader:'url-loader'
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "common-app",
      remotes: {
        third_libs: `third_libs@http://localhost:90/third_libs/remoteEntry.js`,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    })
  ],
};