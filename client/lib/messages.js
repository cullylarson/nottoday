import { isObject } from '@cullylarson/f'

export const getMessage = (messageOrObject) => {
    return isObject(messageOrObject)
        ? messageOrObject.message
        : messageOrObject
}
