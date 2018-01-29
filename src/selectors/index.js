// @flow

import type { StateObject } from "../reducers/app"
import type { ChannelMessagesStateObject } from "../reducers/channelMessages"
import type { ActiveChannelStateObject } from "../reducers/activeChannel"
import type { UsersStateObject } from "../reducers/users"
import type { ChannelsStateObject } from "../reducers/channels"

export const getChannelMessagesState = (state: StateObject): ChannelMessagesStateObject => state.channelMessages

export const getActiveChannelState = (state: StateObject): ActiveChannelStateObject => state.activeChannel

export const getUsersStateObject = (state: StateObject): UsersStateObject => state.users

export const getAllChannelsObject = (state: StateObject): ChannelsStateObject =>
    state.channels
