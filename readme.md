# Not Today

> A Twitter blocklist assistant.

## Development

Copy `config.json.dist` to `config.json` and edit it.

```
npm install
npm run client:watch
npm run server:lint
docker-compose up -d
```

## Production

Copy `config.json.dist` to `config.json` and edit it.

```
npm run client:build
npm run server:forever
```

## Database

Create the database tables using `migrations/create-tables.sql`.

### Hacky Way to Run Server

This will start the server, keep it running, and stay running after disconnecting from SSH:

```
nohup npm run server:forever &
```

## Example `config.json`

_Need use 127.0.0.1 because Twitter doesn't allow 'localhost' in callbacks._

```
{
    "db": {
        "host": "db",
        "user": "dev",
        "pass": "dev",
        "name": "dev"
    },
    "api": {
        "baseUrl": "http://127.0.0.1:3020/api"
    },
    "twitter": {
        "consumerKey": "your consumer api key",
        "consumerSecret": "your consumer api secret key",
        "callbackUrl": "http://127.0.0.1:3020/auth/twitter/callback"
    },
    "sessions": {
        "secret": "basically a strong password used to sign cookies"
    },
    "auth": {
        "encryptionSecret": "basically a strong password used to create JWTs and encrypt sessions in the database",
        "authUrl": "http://127.0.0.1:3020/auth/twitter"
    }
}
```
