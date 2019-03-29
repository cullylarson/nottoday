const nowMs = () => new Date().valueOf()
const nowS = () => Math.floor(nowMs() / 1000)

module.exports = {
    nowMs,
    nowS,
}
