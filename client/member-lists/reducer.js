import * as actionTypes from './action-types'

const initialState = {
    list: {
        lists: [],
        total: 0,
        doing: false,
        errors: [],
        page: 1,
        perPage: 100,
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
                total: action.numTotal,
                page: action.page,
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
                total: 0,
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
