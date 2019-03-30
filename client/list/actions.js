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

function getListSubscribersRequest() {
    return {
        type: actionTypes.GET_LIST_SUBSCRIBERS_REQUEST,
    }
}

function getListSubscribersSuccess(subscribers, nextCursor, previousCursor, noResults) {
    return {
        type: actionTypes.GET_LIST_SUBSCRIBERS_SUCCESS,
        subscribers,
        nextCursor,
        previousCursor,
        noResults,
    }
}

function getListSubscribersFailure(errors) {
    return {
        type: actionTypes.GET_LIST_SUBSCRIBERS_FAILURE,
        errors,
    }
}

export function getListSubscribers(id, cursor) {
    return (dispatch, getState) => {
        dispatch(getListSubscribersRequest())

        const state = getState()

        api.getListSubscribers({
            apiUrl: state.config.api.baseUrl,
            accessToken: state.auth.accessToken,
            id,
            cursor,
        })
            .then(data => {
                if(data.errors) {
                    dispatch(getListSubscribersFailure(data.errors))
                }
                else {
                    dispatch(getListSubscribersSuccess(data.subscribers, data.nextCursor, data.previousCursor, data.noResults))
                }
            })
            .catch(_ => dispatch(getListSubscribersFailure(['Something went wrong and list subscribers could not be fetched. Please try again.'])))
    }
}
