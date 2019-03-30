import * as actionTypes from './action-types'

const initialState = {
    accessToken: null,
    tokenPayload: null,
    expiresAt: null,
}

const actionsMap = {
    [actionTypes.LOGOUT]: (state) => {
        return {
            ...state,
            accessToken: null,
            tokenPayload: null,
            expiresAt: null,
        }
    },
}

export default function(state = initialState, action = {}) {
    const fn = actionsMap[action.type]
    return fn ? fn(state, action) : state
}
