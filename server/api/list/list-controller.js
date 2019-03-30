const { get } = require('@cullylarson/f')
const { messageObj } = require('@server/lib/messages')
const { responseError } = require('@server/lib/response')
const twitterRepo = require('@server/api/twitter/twitter-repo')

module.exports = {
    one: (pool, consumerKey, consumerSecret) => (req, res) => {
        const params = req.query
        const id = get('id', undefined, params)

        twitterRepo.getList({ consumerKey, consumerSecret, token: req.user.token, tokenSecret: req.user.tokenSecret }, id)
            .then((data) => res.json(data))
            .catch(_ => {
                res
                    .status(500)
                    .json(responseError(messageObj('twitter-query', 'Something went wrong and the list could not be retrieved.')))
            })
    },
}
