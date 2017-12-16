// @flow

import type { User } from "../types"

export const USERS_SYNC = "users/sync"
export const createActionUsersSync = (users: { [key: string]: User }) => ({
    type: USERS_SYNC,
    payload: {
        users: users,
    },
})
