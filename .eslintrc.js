module.exports = {
    'extends': ['standard', 'standard-react'],
    'parser': 'babel-eslint',
    'env': {
        'browser': true,
        'es6': true,
        'jquery': false,
    },
    'parserOptions': {
        'ecmaVersion': '2019',
        'sourceType': 'module',
        "ecmaFeatures": {
            "jsx": true
        }
    },
    'rules': {
        'indent': ['error', 4, {'SwitchCase': 1}],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/prop-types': 'off',
        'space-before-function-paren': ['error', 'never'],
        'keyword-spacing': 'off',
        'brace-style': ['error', 'stroustrup', {'allowSingleLine': true}],
        'quotes': ['error', 'single', {'avoidEscape': true}],
        'comma-dangle': ['error', 'always-multiline'],
        'operator-linebreak': ['error', 'before'],
    },
}
