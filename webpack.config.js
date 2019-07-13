const path = require("path");
const {ProvidePlugin} = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./app/index.jsx",

    output: {
        path: path.resolve(__dirname, "dist", "app"),
        filename: "index.js"
    },

    resolve: {
        extensions: [".js", ".jsx"],
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader", "eslint-loader"]
        }]
    },

    plugins: [
        new ProvidePlugin({
            React: "react",
            PropTypes: "prop-types"
        }),

        new HtmlWebpackPlugin({
            template: "app/index.html"
        })
    ],

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 1337
    },

    devtool: "source-map"
};
