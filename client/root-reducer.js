import { combineReducers } from 'redux'
import auth from '@app/auth/reducer'
import config from '@app/config/reducer'
import theHistory from '@app/the-history/reducer'
import nav from '@app/nav/reducer'
import memberList from '@app/member-list/reducer'

export default combineReducers({
    auth,
    config,
    theHistory,
    nav,
    memberList,
})
