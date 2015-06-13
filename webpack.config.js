/*
 A lot of the work here inspired from
 http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup
 */

var Webpack, path, paths,
    ExtractTextPlugin, StatsWriterPlugin,
    config;

Webpack = require('webpack');

path = require('path');

paths = {
    // node path module
    nodeModules: path.resolve(__dirname, 'node_modules'),
    bowerComponents: path.resolve(__dirname, 'bower_components'),
    build: path.resolve(__dirname, 'app'),
    main: path.resolve(__dirname, 'app', 'main.js')
};

// Extract Text Plugin is for embedded stylesheets to be compiled as CSS
// http://webpack.github.io/docs/stylesheets.html
ExtractTextPlugin = require("extract-text-webpack-plugin");

StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

config = {
    // Makes sure errors in console map to the correct file and line number
    devtool: 'inline-source-map',
    debug: true,
    entry: {
        app: [
            // For hot style updates
            'webpack/hot/dev-server',
            // The script refreshing the browser on none hot updates
            'webpack-dev-server/client?http://localhost:8080',
            // Our application
            paths.main
        ],
        vendors: ['react', 'react-router', 'flummox']
    },
    output: {
        // We need to give Webpack a path. It does not actually need it,
        // because files are kept in memory in webpack-dev-server, but an
        // error will occur if nothing is specified. We use the paths.build
        // as that points to where the files will eventually be bundled
        // in production
        path: paths.build,
        filename: 'bundle.js',

        // Everything related to Webpack should go through a build path,
        // localhost:3000/build. That makes proxying easier to handle
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules', 'app']
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
                // favicon
                test: /\.(ico)$/,
                loader: "static-loader"
            },
            {
                test: /\.(jpg?g|png|jpg|svg|gif)$/,
                loaders: [
                    'url?limit=10240&digest=hex&name=img-[sha512:hash:base64:7].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    // We have to manually add the Hot Replacement plugin when running
    // from Node
    plugins: [
        new Webpack.optimize.DedupePlugin(),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new ExtractTextPlugin("styles/global.css"),
        new StatsWriterPlugin({
            path: paths.build,
            filename: "assets.json"
        })
    ]
};

module.exports = config;
