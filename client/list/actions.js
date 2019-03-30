import * as api from './api'
import * as actionTypes from './action-types'

function getOneListRequest() {
    return {
        type: actionTypes.GET_LIST_REQUEST,
    }
}

function getOneListSuccess(list) {
    return {
        type: actionTypes.GET_LIST_SUCCESS,
        list,
    }
}

function getOneListFailure(errors) {
    return {
        type: actionTypes.GET_LIST_FAILURE,
        errors,
    }
}

export function getOneList(id) {
    return (dispatch, getState) => {
        dispatch(getOneListRequest())

        const state = getState()

        api.getOneList({
            apiUrl: state.config.api.baseUrl,
            accessToken: state.auth.accessToken,
            id,
        })
            .then(data => {
                if(data.errors) {
                    dispatch(getOneListFailure(data.errors))
                }
                else {
                    dispatch(getOneListSuccess(data.list))
                }
            })
            .catch(_ => dispatch(getOneListFailure(['Something went wrong and the list could not be fetched. Please try again.'])))
    }
}
