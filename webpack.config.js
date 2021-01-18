const webpack = require('webpack');
const path = require('path');

module.exports = [
    {
        mode: 'development',
        cache: true,
        devtool: 'source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            port: 3000,
            contentBase: './dist',
            open: true,
        },
        context: path.resolve(__dirname, 'src'),
        entry: './Routes.tsx',
        output: {
            filename: './dist/js/build.js',
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: ['ts-loader'],
                },
            ],
        },
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
            extensions: ['.ts', '.tsx', '.js'],
        },
    },
];
