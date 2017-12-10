// @flow

import { combineReducers } from "redux"
import { messagesReducer } from "./messages"
import { newMessageTextReducer } from "./newMessageText"
import { channelIdReducer } from "./channelId"
import type { MessagesStateObject } from "./messages"


export type ActiveChannelStateObject = {|
    channelId: string,
    messages: MessagesStateObject,
    newMessageText: string,
|}

export const activeChannelReducer = combineReducers({
    channelId: channelIdReducer,
    messages: messagesReducer,
    newMessageText: newMessageTextReducer,
})
