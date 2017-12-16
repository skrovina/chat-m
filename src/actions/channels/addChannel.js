// @flow

import { push } from "react-router-redux"
import type { ChannelDTO, NewChannel } from "../../types"

export const ADD_CHANNEL_DISMISS = "addChannel/dismiss"
export const createActionAddChannelDismiss = () => push("/app")

export const ADD_CHANNEL_SUBMIT = "addChannel/submit"
export const createActionAddChannelSubmit = () => ({
    type: ADD_CHANNEL_SUBMIT,
})

export const ADD_CHANNEL_POST = "addChannel/post"
export const createActionAddChannelPost = (newChannel: NewChannel) => ({
    type: ADD_CHANNEL_POST,
    payload: {
        newChannel: newChannel,
    },
})

export const ADD_CHANNEL_POST_SUCCESS = "addChannel/post/success"
export const createActionAddChannelPostSuccess = (channels: ChannelDTO[]) => ({
    type: ADD_CHANNEL_POST_SUCCESS,
    payload: {
        channels: channels,
    },
})

export const ADD_CHANNEL_POST_FAILURE = "addChannel/post/failure"
export const createActionAddChannelPostFailure = (error: string) => ({
    type: ADD_CHANNEL_POST_SUCCESS,
    payload: {
        error: error,
    },
})
