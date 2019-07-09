const path = require("path");

module.exports = {
    entry: "./app/index.jsx",

    output: {
        path: path.resolve(__dirname, "dist", "app"),
        filename: "index.js"
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: "babel-loader"
        }]
    }
};
