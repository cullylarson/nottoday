const jwt = require('express-jwt')

const CheckJwt = (secret) => jwt({
    secret,
})

module.exports = {
    CheckJwt,
}
