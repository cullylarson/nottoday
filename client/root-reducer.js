import { combineReducers } from 'redux'
import config from '@app/config/reducer'
import auth from '@app/auth/reducer'
import theHistory from '@app/the-history/reducer'
import memberLists from '@app/member-lists/reducer'

export default combineReducers({
    auth,
    config,
    theHistory,
    memberLists,
})
