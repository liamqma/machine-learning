var path = require('path');
var webpack = require('webpack');

module.exports = {
    // or devtool: 'eval' to debug issues with compiled output:
    devtool: 'source-map',
    entry: [
        // listen to code updates emitted by hot middleware:
        'webpack-hot-middleware/client',
        // your code:
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.styl/,
                loader: 'style-loader!css-loader!stylus-loader'
            }
        ]
    }
};
