import { isObject } from '@cullylarson/f'

export function classnames(x) {
    return !isObject(x)
        ? x
        : x.filter(x => !!x).join(' ')
}
