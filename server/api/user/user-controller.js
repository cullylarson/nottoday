const { get } = require('@cullylarson/f')
const { messageObj } = require('@server/lib/messages')
const { responseError } = require('@server/lib/response')
const twitterRepo = require('@server/api/twitter/twitter-repo')

module.exports = {
    one: (consumerKey, consumerSecret) => (req, res) => {
        const id = get('id', '', req.params)

        twitterRepo.getUser({ consumerKey, consumerSecret, token: req.user.token, tokenSecret: req.user.tokenSecret }, id)
            .then((user) => res.json({ user }))
            .catch(_ => {
                res
                    .status(500)
                    .json(responseError(messageObj('twitter-query', 'Something went wrong and the user could not be retrieved.')))
            })
    },

    followers: (consumerKey, consumerSecret) => (req, res) => {
        const id = get('id', '', req.params)
        const numPerPage = 100
        const cursor = get('cursor', -1, req.query)

        twitterRepo.getUserFollowers({ consumerKey, consumerSecret, token: req.user.token, tokenSecret: req.user.tokenSecret }, numPerPage, cursor, id)
            .then((data) => res.json(data))
            .catch(_ => {
                res
                    .status(500)
                    .json(responseError(messageObj('twitter-query', 'Something went wrong and followers could not be retrieved.')))
            })
    },
}
