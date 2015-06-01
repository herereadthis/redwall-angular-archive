// Add WebPack to use the included CommonsChunkPlugin
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    // We split the entry into two specific chunks. Our app and vendors.
    // Vendors specify that react should be part of that chunk
    entry: {
        app: ['./app/main.js'],
        vendors: ['react']
    },
    // Use the plugin to specify the resulting filename (and add needed
    // behavior to the compiler)
    //
    // We add a plugin called CommonsChunkPlugin that will take the vendors
    // chunk and create a vendors.js file. As you can see the first argument
    // matches the key of the entry, "vendors"
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new ExtractTextPlugin("styles/global.css")
    ],
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'babel-loader'
                ]
            }
        ]
    },
};

module.exports = config;
