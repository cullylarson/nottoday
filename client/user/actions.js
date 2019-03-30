import * as api from './api'
import * as actionTypes from './action-types'

function getOneUserRequest() {
    return {
        type: actionTypes.GET_USER_REQUEST,
    }
}

function getOneUserSuccess(user) {
    return {
        type: actionTypes.GET_USER_SUCCESS,
        user,
    }
}

function getOneUserFailure(errors) {
    return {
        type: actionTypes.GET_USER_FAILURE,
        errors,
    }
}

export function getOneUser(id) {
    return (dispatch, getState) => {
        dispatch(getOneUserRequest())

        const state = getState()

        api.getOneUser({
            apiUrl: state.config.api.baseUrl,
            accessToken: state.auth.accessToken,
            id,
        })
            .then(data => {
                if(data.errors) {
                    dispatch(getOneUserFailure(data.errors))
                }
                else {
                    dispatch(getOneUserSuccess(data.user))
                }
            })
            .catch(_ => dispatch(getOneUserFailure(['Something went wrong and the user could not be fetched. Please try again.'])))
    }
}

function getUserFollowersRequest() {
    return {
        type: actionTypes.GET_USER_FOLLOWERS_REQUEST,
    }
}

function getUserFollowersSuccess(followers, nextCursor, previousCursor, noResults) {
    return {
        type: actionTypes.GET_USER_FOLLOWERS_SUCCESS,
        followers,
        nextCursor,
        previousCursor,
        noResults,
    }
}

function getUserFollowersFailure(errors) {
    return {
        type: actionTypes.GET_USER_FOLLOWERS_FAILURE,
        errors,
    }
}

export function getUserFollowers(id, cursor) {
    return (dispatch, getState) => {
        dispatch(getUserFollowersRequest())

        const state = getState()

        api.getUserFollowers({
            apiUrl: state.config.api.baseUrl,
            accessToken: state.auth.accessToken,
            id,
            cursor,
        })
            .then(data => {
                if(data.errors) {
                    dispatch(getUserFollowersFailure(data.errors))
                }
                else {
                    dispatch(getUserFollowersSuccess(data.followers, data.nextCursor, data.previousCursor, data.noResults))
                }
            })
            .catch(_ => dispatch(getUserFollowersFailure(['Something went wrong and user followers could not be fetched. Please try again.'])))
    }
}
