require('module-alias/register')
const fs = require('fs')
const path = require('path')
const { pick, isObject } = require('@cullylarson/f')
const express = require('express')
const expressSession = require('express-session')
const MysqlSessionStore = require('express-mysql-session')(expressSession)
const { createPool } = require('mysql')
const passport = require('passport')
const TwitterStrategy = require('passport-twitter')
const jwt = require('jsonwebtoken')
const base64url = require('base64-url')
const { responseError } = require('@server/lib/response')
const { messageObj } = require('@server/lib/messages')
const userRepo = require('@server/user/user-repo')
const port = process.env.PORT || 3020
const app = express()

const devMode = process.env.NODE_ENV !== 'production'

const getConfig = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, '../config.json'), 'utf8')

        return data
            ? JSON.parse(data)
            : null
    }
    catch(e) {
        return null
    }
}

const getManifest = (() => {
    let cachedManifest

    return () => {
        // don't cache in dev mode; just re-read it every time
        if(!devMode && cachedManifest) return cachedManifest

        cachedManifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../build/client/manifest.json'), 'utf8'))

        return cachedManifest
    }
})()

const manifestEntryToEl = (path) => {
    if(/\.js$/.test(path)) return `<script type="text/javascript" src="${path}"></script>`
    else if(/\.css$/.test(path)) return `<link rel="stylesheet" type="text/css" href="${path}">`
    else return ''
}

const formatApiUrl = (url) => {
    if(!url) return null

    return url.replace(/\/$/, '') // no trailing slash
}

const config = getConfig()
if(!config) process.exit(1)

// check that the manifest exists
if(!getManifest()) process.exit(1)

const pool = createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.pass,
    database: config.db.name,
})

const clientConfig = {
    api: {
        baseUrl: formatApiUrl(config.api.baseUrl),
    },
    auth: {
        authUrl: config.auth.authUrl,
    },
}

const staticPath = path.resolve(__dirname, '../build/client/')

const sessionStore = new MysqlSessionStore({
    createDatabaseTable: true,
    endConnectionOnClose: false,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data',
        },
    },
}, pool)

passport.use('twitter', new TwitterStrategy(
    {
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callbackURL: config.twitter.callbackUrl,
    },
    (token, tokenSecret, profile, done) => {
        userRepo.add(pool, {
            twitterId: profile._json.id_str,
            screenName: profile._json.screen_name,
            accountUrl: profile._json.url,
            profileImageUrl: profile._json.profile_image_url_https,
            token,
            tokenSecret,
        })
            .then(() => done(null, profile._json.id_str))
            .catch(_ => done(Error('Something went wrong while storing authentication data.')))
    }
))

passport.serializeUser((twitterId, done) => {
    done(null, { twitterId })
})

passport.deserializeUser(({ twitterId }, done) => {
    userRepo.getOne(pool, twitterId)
        .then(user => {
            done(null, user)
        })
        .catch(_ => done(new Error('Something went wrong while retrieving user data.')))
})

const handle404 = (req, res, next) => {
    res.status(404).json(responseError(messageObj('page-not-found', 'Page not found.')))
}

app.use('/api', require('@server/api')(pool, config))

// serves all static files
app.use(express.static(staticPath))

app.use(expressSession({
    secret: config.sessions.secret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/twitter', passport.authenticate('twitter'))

app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res, next) => {
    if(!req.user) {
        res.send(500, { message: 'Something went wrong and you could not be authenticated.' })
        return next()
    }

    const userP = isObject(req.user)
        ? Promise.resolve(req.user)
        // req.user has not been 'deserialized' yet; it's just a twitterId. so, need to fetch it
        : userRepo.getOne(pool, req.user)

    userP
        .then(user => {
            const token = jwt.sign(pick([
                'twitterId',
                'screenName',
                'accountUrl',
                'profileImageUrl',
            ], user), config.auth.encryptionSecret, {
                expiresIn: '4h',
            })

            res.redirect(`/login/callback/#token=${base64url.encode(token)}`)
        })
        .catch(_ => {
            res.send(500, { message: 'Something went wrong and you could not be authenticated.' })
            next()
        })
})

// all other paths defer to the SPA
app.get('*', (req, res) => {
    const manifest = getManifest()

    res.send(`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:300,300i,400,400i,500,500i" rel="stylesheet">

        ${manifestEntryToEl(manifest['bundle.js'])}
        ${manifestEntryToEl(manifest['bundle.css'])}

        <title>Not Today</title>
    </head>
    <body>
        <div id="app"></div>
        <script>
            (function() {
                if(!window.nottoday) return

                const clientConfig = ${JSON.stringify(clientConfig)}

                window.nottoday.start(document.getElementById('app'), clientConfig)
            })()
        </script>
    </body>
</html>`)
})

app.use(handle404)

app.listen(port)
