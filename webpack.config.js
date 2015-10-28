var path = require('path');
var webpack = require('webpack');

console.log( path.resolve(__dirname));
config = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server',
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
        loaders: [{
            loaders: [
                'react-hot-loader',
                'babel-loader'
            ],
            include: path.join(__dirname, 'app')
        }]
    }
};

module.exports = config;
