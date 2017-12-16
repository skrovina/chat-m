// @flow

import { push } from "react-router-redux"
import type { Channel } from "../../types"

export const CHANNELS_SYNC = "channels/sync"
export const createActionChannelsSync = (channels: { [key: string]: Channel }) => ({
    type: CHANNELS_SYNC,
    payload: {
        channels: channels,
    },
})

export const CHANNELS_GOTO_ADD = "channels/goto/add"
export const createActionGoToChannelsAdd = () => push("/app/add-channel")

export const CHANNELS_ADD = "channels/add"
export const createActionChannelsAdd = (channel: Channel) => ({
    type: CHANNELS_ADD,
    payload: {
        channel: channel,
    },
})

export const CHANNELS_SELECT = "channels/select"
export const createActionChannelsSelect = (channelId: string) => ({
    type: CHANNELS_SELECT,
    payload: {
        channelId: channelId,
    },
})
