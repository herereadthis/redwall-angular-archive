var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'dist');
var mainPath = path.resolve(__dirname, 'app', 'main.js');


var HtmlWebpackPlugin = require('html-webpack-plugin');



var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {

    // We change to normal source mapping
    //devtool: 'source-map',
    entry: {
        app: mainPath,
        vendors: ['react']
    },
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
        // https://www.npmjs.com/package/html-webpack-plugin
        new HtmlWebpackPlugin({
            inject: true,
            template: 'app/index.html'
        }),
        new Webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new ExtractTextPlugin("styles/global.css")
    ]
};

module.exports = config;
