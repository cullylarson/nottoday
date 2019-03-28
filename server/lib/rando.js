const characters = 'abcdefghijklmonpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min

const randomStr = length => [...Array(length)].map(() => characters.substr(randomInt(0, characters.length), 1)).join('')

module.exports = {
    randomInt,
    randomStr,
}
