// @flow

import { push } from "react-router-redux"
import type { Channel, ChannelDTO } from "../../types"

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

export const INVITE_CHANNEL_SUBMIT = "inviteChannel/submit"
export const createActionInviteChannelSubmit = () => ({
    type: INVITE_CHANNEL_SUBMIT,
})

export const INVITE_CHANNEL_POST = "inviteChannel/post"
export const createActionInviteChannelPost = (channel: Channel) => ({
    type: INVITE_CHANNEL_POST,
    payload: {
        channel: channel,
    },
})

export const INVITE_CHANNEL_POST_SUCCESS = "inviteChannel/post/success"
export const createActionInviteChannelPostSuccess = (channels: ChannelDTO[]) => ({
    type: INVITE_CHANNEL_POST_SUCCESS,
    payload: {
        channels: channels,
    },
})


export const DELETE_CHANNEL_SUBMIT = "deleteChannel/submit"
export const createActionDeleteChannelSubmit = () => ({
    type: DELETE_CHANNEL_SUBMIT,
})

export const DELETE_CHANNEL_POST = "deleteChannel/post"
export const createActionDeleteChannelPost = (channel: Channel) => ({
    type: DELETE_CHANNEL_POST,
    payload: {
        channel: channel,
    },
})

export const DELETE_CHANNEL_POST_SUCCESS = "deleteChannel/post/success"
export const createActionDeleteChannelPostSuccess = (channels: ChannelDTO[]) => ({
    type: DELETE_CHANNEL_POST_SUCCESS,
    payload: {
        channels: channels,
    },
})

export const RENAME_CHANNEL_SUBMIT = "renameChannel/submit"
export const createActionRenameChannelSubmit = () => ({
    type: RENAME_CHANNEL_SUBMIT,
})

export const RENAME_CHANNEL_POST = "renameChannel/post"
export const createActionRenameChannelPost = (channel: Channel) => ({
    type: RENAME_CHANNEL_POST,
    payload: {
        channel: channel,
    },
})

export const RENAME_CHANNEL_POST_SUCCESS = "renameChannel/post/success"
export const createActionRenameChannelPostSuccess = (channels: ChannelDTO[]) => ({
    type: RENAME_CHANNEL_POST_SUCCESS,
    payload: {
        channels: channels,
    },
})
