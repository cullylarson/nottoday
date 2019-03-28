import * as actionTypes from './action-types'

const initialState = {
    menuOpen: false,
}

const actionsMap = {
    [actionTypes.TOGGLE_MENU]: (state) => {
        return {
            ...state,
            menuOpen: !state.menuOpen,
        }
    },
    'LOCATION_CHANGED': (state) => {
        return {
            ...state,
            menuOpen: false,
        }
    },
}

export default function(state = initialState, action = {}) {
    const fn = actionsMap[action.type]
    return fn ? fn(state, action) : state
}
