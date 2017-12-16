// @flow

import type { Channel } from "../types"
import { CHANNELS_SYNC } from "../actions/channels/channels"


export type ChannelsStateObject = { [key: string]: Channel }

export const channelsReducer = (state: ChannelsStateObject = {}, action: Object) => {
    switch (action.type) {
        case CHANNELS_SYNC:
            // TODO: merge only unchanged
            return action.payload.channels

        default:
            return state
    }
}
