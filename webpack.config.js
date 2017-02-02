var  path = require('path');

module.exports = {
    entry: {
        main: "./assets/js/App-Starter"
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'build.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }

        ]
    },
    watch: true,
};