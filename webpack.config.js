const path = require('path');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    entry: './src/main/index.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [
                    { loader: 'ts-loader' }
                ]
            }
        ]
    },
    output: {
        filename: 'index.ts',
        path: path.join(__dirname, 'dist')
    }
};