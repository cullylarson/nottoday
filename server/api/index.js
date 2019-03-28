const bodyParser = require('body-parser')
const { messageObj } = require('@app/lib/messages')
const { responseError } = require('@app/lib/response')
const { CheckJwt } = require('@app/lib/auth')
const healthController = require('./health/health-controller')
const memberListsController = require('./member-lists/member-lists-controller')

// customize the response for varius errors
const checkError = (err, req, res, next) => {
    switch(err.name) {
        case 'UnauthorizedError':
            res.status(401).json(responseError(messageObj('invalid-token', 'You must authenticate before performing this action.')))
            break
        case 'ForbiddenError':
            res.status(403).json(responseError(messageObj('forbidden', 'You are not authorized to perform this action.')))
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
    router.use(checkError)

    router.get('/member-lists', memberListsController.list(pool))

    router.use(handle404)

    return router
}
