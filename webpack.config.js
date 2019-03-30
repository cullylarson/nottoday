const webpack = require('webpack')
const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (_, argv) => {
    const mode = argv.mode || 'production'
    const devMode = mode !== 'production'

    return [
        {
            entry: {
                'bundle': path.resolve(__dirname, 'client/app.js')
            },
            output: {
                path: path.resolve(__dirname, 'build/client'),
                filename: '[name].[chunkhash].js',
                chunkFilename: '[name].[chunkhash].bundle.js',
                publicPath: '/',
            },
            resolve: {
                alias: {
                    '@client': path.resolve(__dirname, 'client'),
                },
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: [/node_modules/],
                        use: [
                            'babel-loader',
                            'eslint-loader',
                        ],
                    },
                    {
                        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                        use: 'url-loader?limit=10000&mimetype=application/font-woff',
                    },
                    {
                        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                        use: {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[hash].[ext]',
                            },
                        },
                    },
                    {
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    sourceMap: devMode,
                                }
                            },
                            'postcss-loader?' + (devMode ? 'sourceMap' : ''),
                        ],
                    },
                ],
            },
            devtool: devMode ? 'eval-source-map' : false,
            plugins: [
                new CopyWebpackPlugin([
                    {
                        from: path.resolve(__dirname, 'client/assets/static'),
                        to: path.join(__dirname, 'build/client'),
                    },
                ], {}),
                new ManifestPlugin(),
                // only compress in production
                !devMode ? new CompressionPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: /\.(js|css|html|eot|ttf|woff|woff2|svg)$/,
                    threshold: 0,
                    minRatio: 1,
                }) : null,
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify(mode),
                    },
                }),
            ].filter(x => !!x),
        },
    ]
}
