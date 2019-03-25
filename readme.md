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

### Hacky Way to Run Server

This will start the server, keep it running, and stay running after disconnecting from SSH:

```
nohup npm run server:forever &
```

## Example `config.json`

```
{
    "db": {
        "host": "db",
        "user": "dev",
        "pass": "dev",
        "name": "dev"
    },
    "api": {
        "baseUrl": "http://localhost:3020/api"
    }
}
```
