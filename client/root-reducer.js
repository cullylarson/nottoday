import { combineReducers } from 'redux'
import auth from '@client/auth/reducer'
import config from '@client/config/reducer'
import theHistory from '@client/the-history/reducer'
import nav from '@client/nav/reducer'
import memberList from '@client/member-list/reducer'
import list from '@client/list/reducer'

export default combineReducers({
    auth,
    config,
    theHistory,
    nav,
    memberList,
    list,
})
