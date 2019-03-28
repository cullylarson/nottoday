const percentEncode = require('oauth-percent-encode')
const { createHmac } = require('crypto')
const { compose, join, map } = require('@cullylarson/f')
const { randomStr } = require('@app/lib/rando')

const lexStringCompare = (a, b) => {
    if(a < b) return -1
    if(a > b) return 1
    return 0
}

const buildParamString = compose(
    join('&'),
    map(join('=')),
    xs => xs.sort((a, b) => lexStringCompare(a[0], b[0])),
    map(map(percentEncode)),
    x => Object.values(x),
    map((v, k) => ([k, v])),
    map(x => x.toString ? x.toString() : x),
)

const signRequest = (consumerSecret, tokenSecret, authParams, requestUrl, requestMethod, payload) => {
    const signingKey = [
        percentEncode(consumerSecret),
        percentEncode(tokenSecret),
    ].join('&')

    const encodedParamStr = [
        requestMethod.toUpperCase(),
        '&',
        percentEncode(requestUrl.replace(/[?#].*/, '')), // needs to be a base URL
        '&',
        percentEncode(buildParamString({
            ...payload,
            ...authParams,
        })),
    ].join('')

    return createHmac('sha1', signingKey).update(encodedParamStr, 'utf8').digest('base64')
}

const buildTwitterAuth = (consumerKey, requestMethod, payload) => {
    const authBase = {
        oauth_consumer_key: consumerKey,
        oauth_nonce: randomStr(45),
    }
}

const getMemberLists = () => {
}

module.exports = {
    signRequest,
    getMemberLists,
}
