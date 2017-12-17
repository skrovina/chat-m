// @flow

import { assoc } from "ramda"
import type { Message } from "../types"
import {
    CHANNEL_MESSAGE_SENT_SUCCESS, CHANNEL_MESSAGES_RECEIVED,
    MESSAGE_ADJUST_VOTES_SUCCESS,
} from "../actions/messages"


export type ChannelMessagesStateObject = { [key: string]: Message[] }

export const channelMessagesReducer = (state: ChannelMessagesStateObject = {}, action: Object) => {
    switch (action.type) {
        case CHANNEL_MESSAGES_RECEIVED:
            return assoc(
                action.payload.channelId,
                action.payload.messages,
                state,
            )
        case CHANNEL_MESSAGE_SENT_SUCCESS:
            return assoc(
                action.payload.channelId,
                [...(state[action.payload.channelId] || []), action.payload.message],
                state,
            )
        case MESSAGE_ADJUST_VOTES_SUCCESS:
            return assoc(
                action.payload.channelId,
                (state[action.payload.channelId] || [])
                    .map((m: Message) => (m.id === action.payload.message.id ? action.payload.message : m)),
                state,
            )
        default:
            return state
    }
}

