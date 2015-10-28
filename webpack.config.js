var path = require('path');
//var node_modules = path.resolve(__dirname, 'node_modules');
//var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var webpack = require('webpack');

console.log( path.resolve(__dirname));
config = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server',
        './app/main.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel']
        }]
    }
    //devtool: 'eval',
    //entry: [
    //    'webpack-dev-server/client?http://0.0.0.0:3001',
    //    'webpack/hot/only-dev-server',
    //    path.resolve(__dirname, 'app/main.js')
    //],
    //output: {
    //    path: path.resolve(__dirname, 'public'),
    //    filename: 'bundle.js'
    //},
    //plugins: [
    //    new webpack.HotModuleReplacementPlugin()
    //],
    //module: {
    //    preLoaders: [
    //        {
    //            test: /\.jsx?$/,
    //            loaders: ['eslint']
    //        }
    //    ],
    //    loaders: [{
    //            test: /\.jsx?$/,
    //            loader: 'babel'
    //        },
    //        {
    //            test: /\.css$/, // Only .css files
    //            loader: 'style!css' // Run both loaders
    //        },
    //        {
    //            test: /\.(png|jpg)$/,
    //            loader: 'url?limit=25000'
    //        },
    //        {
    //            loader: 'react-hot'
    //        }
    //    ]
    //}
};

module.exports = config;
