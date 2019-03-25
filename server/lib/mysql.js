function getConnection(pool) {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if(error) reject(error)
            else resolve(connection)
        })
    })
}

function query(pool, queryStr, params) {
    return new Promise((resolve, reject) => {
        pool.query(queryStr, params, (error, results, fields) => {
            if(error) reject(error)
            else resolve({results, fields})
        })
    })
}

function startTransaction(pool) {
    return getConnection(pool)
        .then(connection => {
            return query(connection, 'START TRANSACTION')
                .then(() => connection)
        })
}

function commit(connection) {
    return query(connection, 'COMMIT')
        .then(() => connection.release())
}

function rollback(connection) {
    return query(connection, 'ROLLBACK')
        .then(() => connection.release())
}

module.exports = {
    getConnection,
    query,
    startTransaction,
    commit,
    rollback,
}
