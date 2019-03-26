import { combineReducers } from 'redux'
import stateVersion from '@app/state-version/reducer'
import config from '@app/config/reducer'
import theHistory from '@app/the-history/reducer'
import memberLists from '@app/member-lists/reducer'

export default combineReducers({
    stateVersion,
    config,
    theHistory,
    memberLists,
})
