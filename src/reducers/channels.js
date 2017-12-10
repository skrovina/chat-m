// @flow

import type { Channel } from "../types"


export type ChannelsStateObject = { [key: string]: Channel }

export const channelsReducer = (state: ChannelsStateObject = {}, action: Object) => {
    switch (action.type) {
        default:
            return state
    }
}
