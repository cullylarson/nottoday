const { get } = require('@cullylarson/f')
const { messageObj } = require('@server/lib/messages')
const { responseError } = require('@server/lib/response')
const twitterRepo = require('@server/api/twitter/twitter-repo')

module.exports = {
    list: (consumerKey, consumerSecret) => (req, res) => {
        const params = req.query
        const numPerPage = 100
        const cursor = get('cursor', -1, params)

        twitterRepo.getMemberLists({ consumerKey, consumerSecret, token: req.user.token, tokenSecret: req.user.tokenSecret }, numPerPage, cursor, req.user.twitterId)
            .then((data) => res.json(data))
            .catch(_ => {
                res
                    .status(500)
                    .json(responseError(messageObj('twitter-query', 'Something went wrong and lists you are a member of could not be retrieved.')))
            })
    },
}
