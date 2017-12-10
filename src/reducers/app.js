// @flow

import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { authReducer } from "./auth"
import { usersReducer } from "./users"
import { channelsReducer } from "./channels"
import { activeChannelReducer } from "./activeChannel"
import type { Auth } from "../types"
import type { UsersStateObject } from "./users"
import type { ChannelsStateObject } from "./channels"
import type { ActiveChannelStateObject } from "./activeChannel"


export type StateObject = {|
    routing: Object,
    auth: ?Auth,
    users: UsersStateObject,
    channels: ChannelsStateObject,
    activeChannel: ActiveChannelStateObject,
|}

export const appReducer = combineReducers({
    routing: routerReducer,
    auth: authReducer,
    users: usersReducer,
    channels: channelsReducer,
    activeChannel: activeChannelReducer,
})
