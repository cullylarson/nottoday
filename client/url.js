// (c) 2018 Cully Larson

import QueryString from 'query-string'
import {isString} from '@cullylarson/f'

export function paramUrl(pathname, search) {
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
