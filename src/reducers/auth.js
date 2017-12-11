// @flow

import type { Auth } from "../types"
import { LOGIN_AUTHORIZED } from "../actions/login"


export const authReducer = (state: ?Auth = null, action: Object) => {
    switch (action.type) {
        case LOGIN_AUTHORIZED:
            return action.payload.auth

        default:
            return state
    }
}
