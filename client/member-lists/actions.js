import * as api from './api'
import * as actionTypes from './action-types'

function getMemberListsRequest() {
    return {
        type: actionTypes.GET_MEMBER_LISTS_REQUEST,
    }
}

function getMemberListsSuccess(lists, numTotal, page) {
    return {
        type: actionTypes.GET_MEMBER_LISTS_SUCCESS,
        lists,
        numTotal,
        page,
    }
}

function getMemberListsFailure(errors) {
    return {
        type: actionTypes.GET_MEMBER_LISTS_FAILURE,
        errors,
    }
}

export function getMemberLists(page) {
    return (dispatch, getState) => {
        dispatch(getMemberListsRequest())

        const state = getState()

        api.getMemberLists({
            apiUrl: state.config.api.baseUrl,
            accessToken: state.auth.accessToken,
            page,
            perPage: state.memberLists.list.perPage,
        })
            .then(data => {
                if(data.errors) dispatch(getMemberListsFailure(data.errors))
                else dispatch(getMemberListsSuccess(data.lists, data.numTotal, page))
            })
            .catch(_ => dispatch(getMemberListsFailure(['Something went wrong and the lists you are a member of could not be fetched. Please try again.'])))
    }
}
