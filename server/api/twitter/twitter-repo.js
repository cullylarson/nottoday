const percentEncode = require('oauth-percent-encode')
const fetch = require('node-fetch')
const { createHmac } = require('crypto')
const { compose, join, map, reduce } = require('@cullylarson/f')
const { randomStr } = require('@server/lib/rando')
const { paramUrl } = require('@server/lib/url')
const { nowS } = require('@server/lib/dates')
const { responseData } = require('@server/lib/request')

const toString = x => x + ''

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
    map(toString),
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

const buildTwitterAuth = (tokens, requestUrl, requestMethod, payload) => {
    const authBase = {
        oauth_consumer_key: tokens.consumerKey,
        oauth_nonce: randomStr(45),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: nowS(),
        oauth_token: tokens.token,
        oauth_version: '1.0',
    }

    const auth = {
        ...authBase,
        oauth_signature: signRequest(tokens.consumerSecret, tokens.tokenSecret, authBase, requestUrl, requestMethod, payload),
    }

    return 'OAuth ' + compose(
        join(', '),
        reduce((acc, v, k) => {
            return [
                ...acc,
                `${percentEncode(k)}="${percentEncode(v)}"`,
            ]
        }, []),
        map(toString),
    )(auth)
}

const getMemberLists = (tokens, numPerPage, cursor, userId) => {
    const method = 'get'
    const params = {
        ...{
            user_id: userId,
            count: numPerPage,
        },
        ...(cursor && { cursor }), // empty cursor will produce a bad request
    }

    const url = paramUrl('https://api.twitter.com/1.1/lists/memberships.json', params)

    return fetch(url, {
        method,
        headers: {
            'Authorization': buildTwitterAuth(tokens, url, method, params),
        },
    })
        .then(responseData)
        .then(({ response, data }) => {
            if(response.ok) {
                return data
            }
            else {
                throw new Error('Could not fetch member lists from Twitter.')
            }
        })
}

const getList = (tokens, listId) => {
    const method = 'get'
    const params = {
        list_id: listId,
    }

    const url = paramUrl('https://api.twitter.com/1.1/lists/show.json', params)

    return fetch(url, {
        method,
        headers: {
            'Authorization': buildTwitterAuth(tokens, url, method, params),
        },
    })
        .then(responseData)
        .then(({ response, data }) => {
            if(response.ok) {
                return data
            }
            else {
                throw new Error('Could not fetch list from Twitter.')
            }
        })
}

const getListSubscribers = (tokens, numPerPage, cursor, listId) => {
    const method = 'get'
    const params = {
        ...{
            list_id: listId,
            skip_status: 'true',
            count: numPerPage,
        },
        ...(cursor && { cursor }), // empty cursor will produce a bad request
    }

    const url = paramUrl('https://api.twitter.com/1.1/lists/subscribers.json', params)

    return fetch(url, {
        method,
        headers: {
            'Authorization': buildTwitterAuth(tokens, url, method, params),
        },
    })
        .then(responseData)
        .then(({ response, data }) => {
            if(response.ok) {
                return data
            }
            else {
                throw new Error('Could not fetch list subscribers from Twitter.')
            }
        })
}

module.exports = {
    signRequest,
    getMemberLists,
    getList,
    getListSubscribers,
}
