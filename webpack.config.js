const path = require('path');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    entry: './index.ts',
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
        filename: 'index.js',
        path: path.join(__dirname, 'dist'),
        library: { type: 'commonjs2' }
    }
};
