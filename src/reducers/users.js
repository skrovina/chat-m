// @flow

import { assoc } from "ramda"
import type { User } from "../types"
import { USER_UPDATE, USERS_SYNC } from "../actions/users"


export type UsersStateObject = { [key: string]: User }

export const usersReducer = (state: UsersStateObject = {}, action: Object) => {
    switch (action.type) {
        case USERS_SYNC:
            // TODO: merge only unchanged
            return action.payload.users

        case USER_UPDATE:
            return assoc(
                action.payload.user.email,
                action.payload.user,
                state,
            )
        default:
            return state
    }
}
