const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './client/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './dist')
        },
        proxy: {
            '/pokemon': {
                target: 'http://localhost:8080',
                router: () => 'http://localhost:3000',
                logLevel: 'debug'
            }
        },
        client:{
            overlay: false
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /.(css|scss)$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'})
    ]
}