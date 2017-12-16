// @flow

import users from "./users"
import login from "./login"
import logout from "./logout"
import sync from "./sync"
import channels from "./channels/channels"
import addChannel from "./channels/addChannel"


export const epics = [
    ...users,
    ...login,
    ...logout,
    ...sync,
    ...channels,
    ...addChannel,
]
