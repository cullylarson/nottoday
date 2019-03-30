import { getOneList, getListSubscribers } from './actions'

const loadOneList = (dispatch, { id }) => {
    dispatch(getOneList(id))
}

const loadListSubscribers = (dispatch, { id, cursor }) => {
    cursor = cursor || ''
    dispatch(getListSubscribers(id, cursor))
}

export default {
    '/list/:id': [loadOneList, loadListSubscribers],
    '/list/:id/p/:cursor': [loadOneList, loadListSubscribers],
}
