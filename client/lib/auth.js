import { get } from '@cullylarson/f'
import queryString from 'query-string'
import base64url from 'base64-url'
import jwt from 'jsonwebtoken'

const authKeys = {
    expiresAt: 'auth:expires_at',
    accessToken: 'auth:access_token',
    tokenPayload: 'auth:token_payload',
    returnPath: 'auth:return_path',
}

export const isAuthenticated = () => {
    const authSession = getAuthSession()
    return new Date().getTime() < authSession.expiresAt
}

export const saveReturnPath = (path) => localStorage.setItem(authKeys.returnPath, path)
export const getReturnPath = () => localStorage.getItem(authKeys.returnPath)

const saveAuthSession = (authResult) => {
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime()
    localStorage.setItem(authKeys.accessToken, authResult.accessToken)
    localStorage.setItem(authKeys.tokenPayload, JSON.stringify(authResult.tokenPayload))
    localStorage.setItem(authKeys.expiresAt, JSON.stringify(expiresAt))
}

export const getAuthSession = () => {
    return {
        accessToken: localStorage.getItem(authKeys.accessToken),
        tokenPayload: JSON.parse(localStorage.getItem(authKeys.tokenPayload)),
        expiresAt: JSON.parse(localStorage.getItem(authKeys.expiresAt)),
    }
}

export const logout = () => {
    localStorage.removeItem(authKeys.accessToken)
    localStorage.removeItem(authKeys.tokenPayload)
    localStorage.removeItem(authKeys.expiresAt)
    localStorage.removeItem(authKeys.returnPath)
}

const parseTokenHash = hashName => {
    const parsedHash = queryString.parse(window.location.hash)
    const token = base64url.decode(get('token', '', parsedHash))
    if(!token) return Promise.reject(Error('No token defined in hash.'))

    const tokenDecoded = jwt.decode(token)

    if(!tokenDecoded || !tokenDecoded.iat || !tokenDecoded.exp) return Promise.reject(Error('Could not decode access token.'))

    return Promise.resolve({
        accessToken: token,
        tokenPayload: tokenDecoded,
        expiresIn: tokenDecoded.exp - tokenDecoded.iat,
    })
}

export const verifyAuthentication = () => {
    return parseTokenHash('token')
        .then(authResult => {
            // don't need to validate the tokens because the front-end app can't do anything without accessing
            // an API, which will do the validation
            if(authResult && authResult.accessToken) {
                saveAuthSession(authResult)
                return getAuthSession()
            }
            else {
                throw Error('Could not get access token.')
            }
        })
        .catch(_ => {
            throw Error('Something went wrong and you could not be logged in.')
        })
}
