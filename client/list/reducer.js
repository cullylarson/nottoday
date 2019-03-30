import * as actionTypes from './action-types'

const initialState = {
    one: {
        list: null,
        doing: false,
        errors: [],
    },
}

const actionsMap = {
    [actionTypes.GET_LIST_REQUEST]: (state, action) => {
        return {
            ...state,
            one: {
                ...state.one,
                doing: true,
                errors: [],
            },
        }
    },

    [actionTypes.GET_LIST_SUCCESS]: (state, action) => {
        return {
            ...state,
            one: {
                ...state.one,
                list: action.list,
                doing: false,
                errors: [],
            },
        }
    },

    [actionTypes.GET_LIST_FAILURE]: (state, action) => {
        return {
            ...state,
            one: {
                ...state.one,
                list: null,
                doing: false,
                errors: action.errors,
            },
        }
    },
}

export default function(state = initialState, action = {}) {
    const fn = actionsMap[action.type]
    return fn ? fn(state, action) : state
}
