// @flow

import type { User } from "../types"
import { USERS_SYNC } from "../actions/users"


export type UsersStateObject = { [key: string]: User }

export const usersReducer = (state: UsersStateObject = {}, action: Object) => {
    switch (action.type) {
        case USERS_SYNC:
            // TODO: merge only unchanged
            return action.payload.users

        default:
            return state
    }
}
