// @flow

import type { StateObject } from "../reducers/app"
import type { Auth, User } from "../types"
import { getAuth } from "./auth"
import type { UsersStateObject } from "../reducers/users"
import { createSelector } from "reselect"

export const getSignedInUserEmail = (state: StateObject): ?string =>
    // let
    ((auth = getAuth(state)) =>
        // in
        (auth ? auth.email : null)
    )()

export const getAllUsers = (state: StateObject): UsersStateObject => state.users

export const getSignedUser: (StateObject) => ?User = createSelector(
    getSignedInUserEmail,
    getAllUsers,
    (email: ?string, allUsers: UsersStateObject) => email && allUsers[email]
)
