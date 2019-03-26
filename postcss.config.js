const path = require('path')
const createResolver = require('postcss-import-webpack-resolver')

module.exports = {
    plugins: {
        'postcss-import': {
            resolve: createResolver({
                alias: {
                    '@common': path.resolve(__dirname, 'client/style'),
                },
            }),
        },
        'postcss-mixins': {},
        'postcss-simple-vars': {},
        'postcss-nested-ancestors': {},
        'postcss-nested': {},
        'postcss-custom-media': {},
        'postcss-calc': {mediaQueries: true},
        'postcss-cssnext': {},
        'cssnano': {
            zindex: false,
            // autoprefixer is included in cssnext, so no need to do it again in nano
            autoprefixer: false,
            discardComments: {removeAll: true}
        },
    }
}
