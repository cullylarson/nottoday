const health = require('./health')

module.exports = {
    healthz: (pool) => (req, res) => {
        health.showTables(pool)
            .then(x => {
                if(!x || !x.length) return Promise.reject(new Error())

                res.json({})
            })
            .catch(_ => {
                res
                    .status(500)
                    .json({})
            })
    },
}
