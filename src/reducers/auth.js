// @flow

import type { Auth } from "../types"


export const authReducer = (state: ?Auth = null, action: Object) => {
    switch (action.type) {
        case "LOG_IN":
            return action.payload.auth

        default:
            return state
    }
}
