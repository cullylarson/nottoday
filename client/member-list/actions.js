import * as api from './api'
import * as actionTypes from './action-types'

function getMemberListsRequest() {
    return {
        type: actionTypes.GET_MEMBER_LISTS_REQUEST,
    }
}

function getMemberListsSuccess(lists, nextCursor, previousCursor, noResults) {
    return {
        type: actionTypes.GET_MEMBER_LISTS_SUCCESS,
        lists,
        nextCursor,
        previousCursor,
        noResults,
    }
}

function getMemberListsFailure(errors) {
    return {
        type: actionTypes.GET_MEMBER_LISTS_FAILURE,
        errors,
    }
}

export function getMemberLists(cursor) {
    return (dispatch, getState) => {
        dispatch(getMemberListsRequest())

        const state = getState()

        api.getMemberLists({
            apiUrl: state.config.api.baseUrl,
            accessToken: state.auth.accessToken,
            cursor,
        })
            .then(data => {
                if(data.errors) {
                    dispatch(getMemberListsFailure(data.errors))
                }
                else {
                    dispatch(getMemberListsSuccess(data.lists, data.nextCursor, data.previousCursor, data.noResults))
                }
            })
            .catch(_ => dispatch(getMemberListsFailure(['Something went wrong and the lists you are a member of could not be fetched. Please try again.'])))
    }
}
