import { get, liftA, tail } from '@cullylarson/f'
import pathToRegexp from 'path-to-regexp'
import QueryString from 'query-string'

export function doLoadActions(dispatch, currentRoute, currentSearch, loadActionsList) {
    loadActionsList.forEach(actionsList => {
        Object.keys(actionsList).forEach(route => {
            let keys = []
            const routeRegex = pathToRegexp(route, keys)
            const result = routeRegex.exec(currentRoute)

            if(result === null) return

            // the first element in result is the matched route, which we don't need
            const params = tail(result).reduce((acc, v, i) => {
                const keyName = get([i, 'name'], undefined, keys)

                return !keyName ? acc : {
                    ...acc,
                    [keyName]: v,
                }
            }, {})

            const query = QueryString.parse(currentSearch)

            const actions = liftA(actionsList[route])

            actions.forEach(action => action(dispatch, params, query))
        })
    })
}
