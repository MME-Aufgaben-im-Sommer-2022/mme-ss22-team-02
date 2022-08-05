/* eslint-disable */
require("dotenv/config");
const path = require("path");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
    entry: "./src/index.js",
    mode: isDevelopment ? "development" : "production",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "app/dist/"),
        publicPath: "/dist/",
        filename: "bundle.js",
    },
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, "app/"),
        port: process.env.DEV_PORT,
        publicPath: `http://localhost:${process.env.DEV_PORT}/dist/`,
        hotOnly: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin(),isDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean),
};
