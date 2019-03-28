// const { getInt } = require('@cullylarson/f')
const { messageObj } = require('@app/lib/messages')
const { responseError } = require('@app/lib/response')

module.exports = {
    list: (pool) => (req, res) => {
        // const params = req.query
        // const num = getInt('num', 20, params)
        // const offset = getInt('offset', 0, params)

        Promise.resolve([30, []])
            .then(([numTotal, memberLists]) => res.json({ numTotal, memberLists }))
            .catch(err => {
                throw err
            })
            .catch(_ => {
                res
                    .status(500)
                    .json(responseError(messageObj('database-query', 'Something went wrong and the list of accounts could not be retrieved.')))
            })
    },
}
