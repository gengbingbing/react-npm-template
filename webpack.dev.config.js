const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader', options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            // {
            //     test: /\.(js|jsx)$/,
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            //     include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'test')],
            //     options: {
            //         formatter: require('eslint-friendly-formatter')
            //     }
            // },
            {
                test: /\.(jpg|jpeg|git|png|svg|bmp)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name]-[hash:8].[ext]'
                    }
                }]
            },
            {
                test: /\.(ttf|svg|eot|woff|woff2)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[name]-[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        port: 8888
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'public/index.html'
        })
    ]
};