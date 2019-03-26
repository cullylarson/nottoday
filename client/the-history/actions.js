import * as actionTypes from './action-types'

export function saveLastPageLocation(location) {
    return {
        type: actionTypes.SAVE_LAST_PAGE_LOCATION,
        location,
    }
}
