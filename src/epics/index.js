// @flow

import login from "./login"
import logout from "./logout"
import sync from "./sync"
import channels from "./channels/channels"
import addChannel from "./channels/addChannel"
import inviteChannel from "./channels/inviteChannel"
import renameChannel from "./channels/renameChannel"
import deleteChannel from "./channels/deleteChannel"
import messages from "./messages"
import editProfile from "./editProfile"
import errorDisplay from "./notificationDisplay"
import error from "./error"


export const epics = [
    ...login,
    ...logout,
    ...sync,
    ...channels,
    ...addChannel,
    ...messages,
    ...inviteChannel,
    ...renameChannel,
    ...deleteChannel,
    ...editProfile,
    ...errorDisplay,
    ...error,
]
