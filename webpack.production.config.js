// Most things in here will mirror webpack.config.js. For clarification on
// what is implemented here, see the comments in that file.
var Webpack, path, paths, ExtractTextPlugin, HtmlWebpackPlugin, config;

Webpack = require('webpack');

path = require('path');

paths = {
    // node path module
    nodeModules: path.resolve(__dirname, 'node_modules'),
    bowerComponents: path.resolve(__dirname, 'bower_components'),
    build: path.resolve(__dirname, 'dist'),
    main: path.resolve(__dirname, 'app', 'main.js')
};

ExtractTextPlugin = require("extract-text-webpack-plugin");

// https://www.npmjs.com/package/html-webpack-plugin
HtmlWebpackPlugin = require('html-webpack-plugin');

config = {
    debug: false,
    entry: {
        app: paths.main,
        vendors: ['react', 'react-router', 'flummox']
    },
    output: {
        path: paths.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [paths.nodeModules, paths.bowerComponents],
                loader: 'babel',
                query: {
                    optional: [],
                    stage: 0
                }
            },
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader', 'css-loader!less-loader'
                )
            },
            {
                test: /\.(json)$/,
                loader: 'json'
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
    plugins: [
        // Search for equal or similar files and deduplicate them in the
        // output.
        new Webpack.optimize.DedupePlugin(),
        new Webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'app/index.html'
        }),
        new Webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new ExtractTextPlugin("styles/global.css")
    ]
};

module.exports = config;
