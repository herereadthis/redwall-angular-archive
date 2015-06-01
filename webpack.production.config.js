var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'dist', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');


var HtmlWebpackPlugin = require('html-webpack-plugin');



var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {

    // We change to normal source mapping
    devtool: 'source-map',
    entry: mainPath,
    output: {
        path: buildPath,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: [nodeModulesPath]
        },{
            test: /\.(css|less)$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        }]
    },
    // We have to manually add the Hot Replacement plugin when running
    // from Node
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'public/index.html'
        }),
        new ExtractTextPlugin("styles/global.css")
    ]
};

module.exports = config;
