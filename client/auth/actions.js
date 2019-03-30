import * as actionTypes from './action-types'
import { logout as authLogout } from '@client/lib/auth'

export function logout() {
    authLogout()

    return {
        type: actionTypes.LOGOUT,
    }
}
