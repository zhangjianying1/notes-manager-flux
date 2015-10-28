/**
 * Created by Илья on 29.10.2015.
 */
var path = require('path');
var webpack = require('webpack');
console.log( path.join(__dirname,'app/main.js'));
module.exports = {
    entry: path.join(__dirname,'app/main.js'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'app')
        }]
    }
};
