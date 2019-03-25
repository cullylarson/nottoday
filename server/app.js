require('module-alias/register')
const fs = require('fs')
const path = require('path')
const express = require('express')
const {createPool} = require('mysql')
const port = process.env.PORT || 3020
const app = express()

const devMode = process.env.NODE_ENV !== 'production'

const getConfig = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, '../config.json'))

        return data
            ? JSON.parse(data)
            : null
    }
    catch(e) {
        return null
    }
}

const getManifest = (() => {
    let cachedManifest = undefined

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
}

const staticPath = path.resolve(__dirname, '../build/client/')

// serves all static files
app.use(express.static(staticPath))

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

app.listen(port)
