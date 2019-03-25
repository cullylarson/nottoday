const webpack = require('webpack')
const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')
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
                    '@app': path.resolve(__dirname, 'client'),
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
                new ManifestPlugin(),
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify(mode),
                    },
                }),
                new CopyWebpackPlugin([
                    {
                        from: path.resolve(__dirname, 'client/static'),
                        to: path.resolve(__dirname, 'build/client'),
                    },
                ], {})
            ],
        },
    ]
}
