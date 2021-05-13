// const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
module.exports = {
  entry: "/index.js",
  mode: process.env.NODE_ENV,
  devtool:"hidden-source-map",
  output: {
    publicPath: "http://localhost:3001/",
    clean:true
  },
  module: {
  },
  plugins: [
    new ModuleFederationPlugin({
      //此处的name作为模块的key
      //"webpack/container/entry/third_libs"
      name: "third_libs",
      //此处的name是作为入口文件的外层变量
      // var third_libs
      library: { type: "var", name: "third_libs" },
      filename: "remoteEntry.js",
      exposes: {
        "./react": "react",
        "./react-dom":"react-dom"
      }
    })
  ],
};