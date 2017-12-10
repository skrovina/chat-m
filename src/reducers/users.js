// @flow

import type { User } from "../types"


export type UsersStateObject = { [key: string]: User }

export const usersReducer = (state: UsersStateObject = {}, action: Object) => {
    switch (action.type) {
        default:
            return state
    }
}
