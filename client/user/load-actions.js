import { getOneUser, getUserFollowers } from './actions'

const loadOneUser = (dispatch, { id }) => {
    dispatch(getOneUser(id))
}

const loadUserFollowers = (dispatch, { id, cursor }) => {
    cursor = cursor || ''
    dispatch(getUserFollowers(id, cursor))
}

export default {
    '/user/:id': [loadOneUser, loadUserFollowers],
    '/user/:id/p/:cursor': [loadOneUser, loadUserFollowers],
}
