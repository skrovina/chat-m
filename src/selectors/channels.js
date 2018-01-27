// @flow

import { createSelector } from "reselect"
import type { StateObject } from "../reducers/app"
import type { Channel } from "../types"
import type { ChannelsStateObject } from "../reducers/channels"
import { getSignedInUserEmail } from "./users"
import { fromAssoc } from "../utils/collections"

export const getAllChannelsObject = (state: StateObject): ChannelsStateObject =>
    state.channels

export const getUserChannels: (StateObject) => Channel[] = createSelector(
    getSignedInUserEmail,
    getAllChannelsObject,
    (userEmail, allChannels: ChannelsStateObject) =>
        fromAssoc(allChannels)
            .filter((channel: Channel) =>
                channel.creatorEmail === userEmail
                || channel.participators[userEmail] != null),
)

export const getUserChannelsSorted: (StateObject) => Channel[] = createSelector(
    getUserChannels,
    (channels: Channel[]) => channels.sort((c1, c2) => {
        if (c1.name.toLowerCase() < c2.name.toLowerCase()) {
            return -1
        }
        if (c1.name.toLowerCase() > c2.name.toLowerCase()) {
            return 1
        }
        return 0
    })
)
