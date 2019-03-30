import * as actionTypes from './action-types'

const initialState = {
    one: {
        data: null,
        doing: false,
        errors: [],
    },
    followers: {
        data: [],
        nextCursor: 0,
        previousCursor: 0,
        noResults: true,
        doing: false,
        errors: [],
    },
}

const actionsMap = {
    [actionTypes.GET_USER_REQUEST]: (state, action) => {
        return {
            ...state,
            one: {
                ...state.one,
                doing: true,
                errors: [],
            },
        }
    },

    [actionTypes.GET_USER_SUCCESS]: (state, action) => {
        return {
            ...state,
            one: {
                ...state.one,
                data: action.user,
                doing: false,
                errors: [],
            },
        }
    },

    [actionTypes.GET_USER_FAILURE]: (state, action) => {
        return {
            ...state,
            one: {
                ...state.one,
                user: null,
                doing: false,
                errors: action.errors,
            },
        }
    },

    [actionTypes.GET_USER_FOLLOWERS_REQUEST]: (state, action) => {
        return {
            ...state,
            followers: {
                ...state.followers,
                doing: true,
                errors: [],
            },
        }
    },

    [actionTypes.GET_USER_FOLLOWERS_SUCCESS]: (state, action) => {
        return {
            ...state,
            followers: {
                ...state.followers,
                data: action.followers,
                nextCursor: action.nextCursor,
                previousCursor: action.previousCursor,
                noResults: action.noResults,
                doing: false,
                errors: [],
            },
        }
    },

    [actionTypes.GET_USER_FOLLOWERS_FAILURE]: (state, action) => {
        return {
            ...state,
            followers: {
                ...state.followers,
                data: [],
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
