const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
  entry: "./src/index.js",
  output: {
    clean: true,
    path: path.resolve(__dirname, "build"),
    filename: "buildPage.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[contenthash].[ext][query]",
        },
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/icon/[contenthash].[ext][query]",
        },
      },
      {
        test: /\.png$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/img/[contenthash].[ext][query]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      template: "./src/public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};