const { compose, split, get } = require('@cullylarson/f')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const { messageObj } = require('@app/lib/messages')
const { responseError } = require('@app/lib/response')
const { CheckJwt } = require('@app/lib/auth')
const UnauthorizedError = require('@app/lib/errors/UnauthorizedError')
const userRepo = require('@app/user/user-repo')
const healthController = require('./health/health-controller')
const memberListsController = require('./member-list/member-list-controller')

// customize the response for varius errors
const checkError = (err, req, res, next) => {
    switch(err.name) {
        case 'UnauthorizedError':
            res.status(401).json(responseError(messageObj('invalid-token', 'You must authenticate before performing this action.')))
            break
        case 'PageNotFoundError':
            res.status(404).json(responseError(messageObj('page-not-found', 'Page not found.')))
            break
        case 'SyntaxError':
            res.status(400).json(responseError(messageObj('bad-json', 'Your JSON request is not formatted correctly.')))
            break
        default:
            res.status(500).json(responseError(messageObj('unknown', 'Unknown error.')))
    }
}

const handle404 = (req, res, next) => {
    res.status(404).json(responseError(messageObj('page-not-found', 'Page not found.')))
}

const setAuth = (req, res, next) => {
    req.auth = compose(
        jwt.decode,
        get(1, ''),
        split(' '), // looks like: Bearer the-token
        get(['headers', 'authorization'], '')
    )(req)

    if(!req.auth) next(new UnauthorizedError('no-token', { message: 'You must provide a bearer token to access this resource.' }))
    else next()
}

const setUser = (pool) => (req, res, next) => {
    userRepo.getOne(pool, req.auth.twitterId)
        .then(user => {
            if(!user) throw Error()

            req.user = user
            next()
        })
        .catch(_ => {
            next(new UnauthorizedError('no-auth', { message: 'You must authorize before accessing this resource.' }))
        })
}

module.exports = (pool, authEncryptionSecret) => {
    const router = require('express').Router()
    const checkJwt = CheckJwt(authEncryptionSecret)

    router.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE')
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization')
        next()
    })

    router.use((req, res, next) => {
        res.set('X-Powered-By', 'Not Today')
        next()
    })

    // needs to be before the checkJwt middlware so it's public
    router.get('/healthz', healthController.healthz(pool))

    router.use(bodyParser.json())
    router.use(checkJwt)
    router.use(setAuth)
    router.use(setUser(pool))
    router.use(checkError)

    router.get('/member-list', memberListsController.list(pool))

    router.use(handle404)

    return router
}
