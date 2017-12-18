// @flow

import type { ActiveChannelStateObject } from "../reducers/activeChannel"
import type { StateObject } from "../reducers/app"
import { getUserChannelsSorted } from "./channels"

export const getActiveChannelState = (state: StateObject): ActiveChannelStateObject => state.activeChannel

export const getActiveChannelId = (state: StateObject): ?string => getActiveChannelState(state).channelId ||
    // let
    ((sortedChannels = getUserChannelsSorted(state),
        firstChannel = sortedChannels[0],
        firstChannelId = firstChannel && firstChannel.id) =>
        // in
        firstChannelId
    )()

export const getActiveChannelNewMessageText = (state: StateObject): string =>
    getActiveChannelState(state).newMessageText

export const getNewMessageTextValid = (state: StateObject): boolean =>
    getActiveChannelNewMessageText(state).length > 0

export const getSearchText = (state: StateObject): string =>
    getActiveChannelState(state).messageSearchText
