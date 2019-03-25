import { combineReducers } from 'redux'
import stateVersion from '@app/state-version/reducer'
import config from '@app/config/reducer'
import memberLists from '@app/member-lists/reducer'

export default combineReducers({
    stateVersion,
    config,
    memberLists,
})
