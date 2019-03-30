import * as actionTypes from './action-types'

const initialState = {
    list: {
        lists: [],
        nextCursor: 0,
        previousCursor: 0,
        noResults: true,
        doing: false,
        errors: [],
    },
}

const actionsMap = {
    [actionTypes.GET_MEMBER_LISTS_REQUEST]: (state, action) => {
        return {
            ...state,
            list: {
                ...state.list,
                doing: true,
                errors: [],
            },
        }
    },

    [actionTypes.GET_MEMBER_LISTS_SUCCESS]: (state, action) => {
        return {
            ...state,
            list: {
                ...state.list,
                lists: action.lists,
                nextCursor: action.nextCursor,
                previousCursor: action.previousCursor,
                noResults: action.noResults,
                doing: false,
                errors: [],
            },
        }
    },

    [actionTypes.GET_MEMBER_LISTS_FAILURE]: (state, action) => {
        return {
            ...state,
            list: {
                ...state.list,
                lists: [],
                nextCursor: 0,
                previousCursor: 0,
                noResults: 0,
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
