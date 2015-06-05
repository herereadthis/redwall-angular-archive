var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'dist');
var mainPath = path.resolve(__dirname, 'app', 'main.js');
//var faviconLoader = require('./server/favicon-loader.js');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {

    // We change to normal source mapping
    //devtool: 'source-map',
    entry: {
        app: mainPath,
        vendors: ['react', 'react-router']
    },
    output: {
        path: buildPath,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [nodeModulesPath]
            },
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.(ico)$/,
                loader: "static-loader"
            },
            {
                test: /\.(jpg?g|png|jpg|svg|gif)$/,
                loaders: [
                    "url?limit=10240&digest=hex&name=img-[sha512:hash:base64:7].[ext]",
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules', 'app/']
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
