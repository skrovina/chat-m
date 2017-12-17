// @flow

import { combineReducers } from "redux"
import { newMessageTextReducer } from "./newMessageText"
import { channelIdReducer } from "./channelId"
import { messageSearchReducer } from "./messageSearch"


export type ActiveChannelStateObject = {|
    channelId: ?string,
    newMessageText: string,
    searchText: string,
    messageSearchText: string,
|}

export const activeChannelReducer = combineReducers({
    channelId: channelIdReducer,
    newMessageText: newMessageTextReducer,
    messageSearchText: messageSearchReducer,
})
