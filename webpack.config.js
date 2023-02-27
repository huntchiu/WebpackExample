const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    vendor: [
      "jquery",
      "bootstrap",
      "bootstrap/scss/bootstrap.scss",
      "bootstrap/dist/js/bootstrap.js",
    ],
    site: "./src/js/site.js",
  },
  output: {
    filename: "static/js/[name].js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // 使用handlebars 模板引擎
      {
        test: /\.hbs$/,
        use: [
          {
            loader: "handlebars-loader",
            options: {
              partialDirs: [path.join(__dirname, "src", "views", "Shared")],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 將 Scss 樣式表提取到獨立的 CSS 文件中
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    //清除構建資料夾
    new CleanWebpackPlugin(),

    // 輸出html頁面和設置其使用的js css資源
    new HtmlWebpackPlugin({
      template: "./src/views/Home/Index.hbs",
      filename: "index.html",
      chunks: ["vendor", "site"],
      minify: false, // 禁用HTML壓縮功能
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "./src/views/Account/Login.hbs",
      filename: "Account/login.html",
      chunks: ["site", "vendor"], // 改變這裡不會影響加載順序，要改變entry
      minify: false,
      inject: "body",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    // 設定提取樣式表的名稱
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
    }),
  ],

  devServer: {
    port: 8080,
    hot: false, // 禁用熱模塊替換（HMR）功能，啟用LiveReload功能。
    static: {
      directory: path.join(__dirname, "public"),
    },
    open: true,
  },
};
