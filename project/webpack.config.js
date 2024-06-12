const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        client: {
            overlay: {
                errors: true,
                warnings: false,
                runtimeErrors: true,
            },
        },
        compress: true,
        port: 8080,
    },
    optimization: {
        runtimeChunk: 'single',
    },
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        filename: '[name]-[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/',
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: "lodash",
        }),
        new HtmlWebpackPlugin({
            title: "Project",
            // template: path.resolve(__dirname, "assets", "index.ejs"),
        }),
    ],
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.m?[jt]sx?$/i,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    // "options": {
                    //     presets: ['@babel/preset-env']
                    // },
                }
            },
            {
                test: /\.ejs$/i,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: ['html-loader', 'template-ejs-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
};
