const nodeExternals = require('webpack-node-externals');
const {join} = require('path');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = function (options, webpack) {
    const outputFolder = join(__dirname, 'dist', 'server');
    const config = {
        ...options,
        entry: [
            options.entry
        ],
        externals: [
            nodeExternals({
                allowlist: ['webpack/hot/poll?100'],
            }),
        ],
        plugins: [
            ...options.plugins,
            new CleanWebpackPlugin(),
        ],
        output: {
            path: outputFolder,
            filename: options.output.filename,
        },
    };

    if (process.env.NODE_ENV !== 'production') {
        const {RunScriptWebpackPlugin} = require("run-script-webpack-plugin");

        config.devtool = 'eval';
        config.entry.unshift('webpack/hot/poll?100');
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.WatchIgnorePlugin({
                paths: [/\.js$/, /\.d\.ts$/],
            }),
            new RunScriptWebpackPlugin({
                name: options.output.filename
            })
        )
    } else {
        config.devtool = 'source-map';
    }

    return config;
};
