const { get, toString, identity } = require('@cullylarson/f')
const { query } = require('@app/lib/mysql')
const { getParams } = require('@app/lib/params')

const prepareResult = getParams({
    twitterId: [undefined, toString],
    screenName: ['', toString],
    accountUrl: ['', toString],
    profileImageUrl: ['', toString],
    token: [undefined, toString],
    tokenSecret: [undefined, toString],
    created: [undefined, identity],
    updated: [undefined, identity],
})

const getOne = (pool, twitterId) => {
    return query(pool, 'SELECT * FROM users WHERE twitterId = ? LIMIT 1', [twitterId])
        .then(get(['results', 0], undefined))
        .then(x => x ? prepareResult(x) : x)
}

const add = (pool, {
    twitterId,
    screenName,
    accountUrl,
    profileImageUrl,
    token,
    tokenSecret,
}) => {
    return query(pool, `
        INSERT INTO users
            (twitterId, screenName, accountUrl, profileImageUrl, token, tokenSecret, created)
        VALUES
            (?, ?, ?, ?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE
            screenName = ?,
            accountUrl = ?,
            profileImageUrl = ?,
            token = ?,
            tokenSecret = ?,
            updated = NOW()
        `, [
        twitterId,
        screenName,
        accountUrl,
        profileImageUrl,
        token,
        tokenSecret,
        screenName,
        accountUrl,
        profileImageUrl,
        token,
        tokenSecret,
    ])
        .then(_ => twitterId)
}

module.exports = {
    getOne,
    add,
}
