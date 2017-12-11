// @flow

import users from "./users"
import login from "./login"

export const epics = [
    ...users,
    ...login,
]
