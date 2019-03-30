import { getMemberLists } from './actions'

const loadMemberLists = (dispatch, { cursor }) => {
    cursor = cursor || ''
    dispatch(getMemberLists(cursor))
}

export default {
    '/member-list/p/:cursor': loadMemberLists,
    '/member-list': loadMemberLists,
}
