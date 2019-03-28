const { query } = require('@app/lib/mysql')

const showTables = (pool) => {
    return query(pool, 'SHOW TABLES')
        .then(x => x && x.results ? x.results.map(x => Object.values(x)).reduce((acc, x) => ([...acc, ...x]), []) : [])
}

module.exports = {
    showTables,
}
