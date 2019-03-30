import { getOneList } from './actions'

const loadOneList = (dispatch, { id }) => {
    dispatch(getOneList(id))
}

export default {
    '/list/:id': loadOneList,
}
