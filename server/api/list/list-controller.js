const { get } = require('@cullylarson/f')
const { messageObj } = require('@server/lib/messages')
const { responseError } = require('@server/lib/response')
const twitterRepo = require('@server/api/twitter/twitter-repo')

module.exports = {
    one: (consumerKey, consumerSecret) => (req, res) => {
        const id = get('id', '', req.params)

        twitterRepo.getList({ consumerKey, consumerSecret, token: req.user.token, tokenSecret: req.user.tokenSecret }, id)
            .then((list) => res.json({ list }))
            .catch(_ => {
                res
                    .status(500)
                    .json(responseError(messageObj('twitter-query', 'Something went wrong and the list could not be retrieved.')))
            })
    },

    subscribers: (consumerKey, consumerSecret) => (req, res) => {
        const id = get('id', '', req.params)
        const numPerPage = 100
        const cursor = get('cursor', -1, req.query)

        twitterRepo.getListSubscribers({ consumerKey, consumerSecret, token: req.user.token, tokenSecret: req.user.tokenSecret }, numPerPage, cursor, id)
            .then((data) => res.json(data))
            .catch(_ => {
                res
                    .status(500)
                    .json(responseError(messageObj('twitter-query', 'Something went wrong and list subscribers could not be retrieved.')))
            })
    },
}
