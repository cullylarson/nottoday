import { getMemberLists } from './actions'

const loadMemberLists = (dispatch, { page }) => {
    page = page || 1
    dispatch(getMemberLists(page))
}

export default {
    '/member-lists/p/:page(\\d+)': loadMemberLists,
    '/member-lists': loadMemberLists,
}
