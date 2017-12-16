// @flow

import type { Auth } from "../types"
import { LOGIN_AUTHORIZED } from "../actions/login"
import { LOGOUT } from "../actions/logout"


export const authReducer = (state: ?Auth = null, action: Object) => {
    switch (action.type) {
        case LOGIN_AUTHORIZED:
            return action.payload.auth

        case LOGOUT:
            return null

        default:
            return state
    }
}
