const QueryString = require('query-string')
const { isString } = require('@cullylarson/f')

function paramUrl(pathname, search) {
    const queryString = isString(search)
        ? search
        : QueryString.stringify(search)

    return [
        pathname.trim().replace(/\?$/, ''),
        queryString,
    ]
        .filter(x => !!x)
        .join('?')
}

module.exports = {
    paramUrl,
}
