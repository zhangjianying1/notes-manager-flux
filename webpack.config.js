var path = require('path');
var webpack = require('webpack');

console.log( path.resolve(__dirname));
config = {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './build'
    },
    entry: [
        'webpack-dev-server/client?http://localhost:3001',
        path.resolve(__dirname, 'app/main.js')
    ],
    output: {
        path: path.join(__dirname, 'dev'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:3001/dev/'//publicPath is where you want Webpack to make requests.
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint']
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'react-hot-loader',
                include: path.join(__dirname, 'app')
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    stage: 0
                }
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            }

        ]
    }
};

module.exports = config;
