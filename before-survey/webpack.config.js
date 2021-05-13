const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "/index.js",
  mode: "development",
  devtool:"hidden-source-map",
  output: {
    publicPath: "http://localhost:3000/",
    clean:true
  },
  resolve:{
    extensions: ['.jsx', '.js', '.json','.css','.scss','.jpg','jpeg','png',],
  },
  module: {
    rules: [
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
      name: "before-survey",
      remotes: {
        third_libs: "third_libs@http://127.0.0.1:3001/remoteEntry.js",
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    })
  ],
};