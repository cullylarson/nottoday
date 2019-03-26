import * as actionTypes from './action-types'

const initialState = {
    lastPageLocation: null,
}

const actionsMap = {
    [actionTypes.SAVE_LAST_PAGE_LOCATION]: (state, action) => {
        return {
            ...state,
            lastPageLocation: action.location,
        }
    },
}

export default function(state = initialState, action = {}) {
    const fn = actionsMap[action.type]
    return fn ? fn(state, action) : state
}
