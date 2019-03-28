const { pick, map, curry } = require('@cullylarson/f')

// keyDef looks like: [defaultValue, filterFunction]
const getParams = curry((keyDefs, x) => {
    const keyToDefaultValue = map((def) => def[0], keyDefs)

    const unfilteredValues = pick(keyToDefaultValue, x)

    return map((value, k) => keyDefs[k][1](value), unfilteredValues)
})

module.exports = {
    getParams,
}
