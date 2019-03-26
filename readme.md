# Not Today

> A Twitter blocklist assistant.

## Development

Copy `config.json.dist` to `config.json` and edit it.

```
npm install
npm run client:watch
docker-compose up -d
```

## Production

Copy `config.json.dist` to `config.json` and edit it.

```
npm run client:build
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
    "auth": {
        "encryptionSecret": "basically a strong password used to create JWTs and encrypt sessions in the database",
        "authUrl": "http://127.0.0.1:3020/auth/twitter",
        "callbackUrl": "http://127.0.0.1:3020/auth/twitter/callback",
    }
}
```
