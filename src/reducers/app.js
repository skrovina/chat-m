// @flow

import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { reducer as formReducer } from "redux-form"

import { authReducer } from "./auth"
import { usersReducer } from "./users"
import { channelsReducer } from "./channels"
import { activeChannelReducer } from "./activeChannel"
import { channelMessagesReducer } from "./channelMessages"
import type { Auth } from "../types"
import type { UsersStateObject } from "./users"
import type { ChannelsStateObject } from "./channels"
import type { ActiveChannelStateObject } from "./activeChannel"
import type { ChannelMessagesStateObject } from "./channelMessages"


export type StateObject = {|
    routing: Object,
    form: Object,
    auth: ?Auth,
    users: UsersStateObject,
    channels: ChannelsStateObject,
    activeChannel: ActiveChannelStateObject,
    channelMessages: ChannelMessagesStateObject,
|}

export const appReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    auth: authReducer,
    users: usersReducer,
    channels: channelsReducer,
    activeChannel: activeChannelReducer,
    channelMessages: channelMessagesReducer,
})
