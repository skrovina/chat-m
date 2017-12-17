// @flow

import { push } from "react-router-redux"
import type { Message } from "../types"

export const MESSAGE_COMPOSE_TEXT_CHANGED = "message/compose/textChanged"
export const createActionMessageComposeTextChanged = (text: string) => ({
    type: MESSAGE_COMPOSE_TEXT_CHANGED,
    payload: {
        text: text,
    },
})

export const MESSAGE_COMPOSE_SEND = "message/compose/send"
export const createActionMessageComposeSend = () => ({
    type: MESSAGE_COMPOSE_SEND,
})

export const MESSAGE_COMPOSE_SENT = "message/compose/sent"
export const createActionMessageComposeSent = () => ({
    type: MESSAGE_COMPOSE_SENT,
})

export const CHANNEL_MESSAGES_RECEIVED = "channel/messages/received"
export const createActionChannelMessagesReceived = (channelId: string, messages: Message[]) => ({
    type: CHANNEL_MESSAGES_RECEIVED,
    payload: {
        channelId: channelId,
        messages: messages,
    },
})

export const ACTIVE_CHANNEL_MESSAGES_SYNC = "channel/active/messages/sync"
export const createActionActiveChannelMessagesSync = (channelId: string, messages: Message[]) => ({
    type: ACTIVE_CHANNEL_MESSAGES_SYNC,
    payload: {
        channelId: channelId,
        messages: messages,
    },
})

export const MESSAGE_SEARCH_TEXT_CHANGED = "messages/search/textChanged"
export const createActionMessageSearchTextChanged = (text: string) => ({
    type: MESSAGE_SEARCH_TEXT_CHANGED,
    payload: {
        text: text,
    },
})

export const CHANNEL_MESSAGE_SENT_SUCCESS = "channel/message/sent/success"
export const createActionChannelMessageSentSuccess = (channelId: string, message: Message) => ({
    type: CHANNEL_MESSAGE_SENT_SUCCESS,
    payload: {
        channelId: channelId,
        message: message,
    },
})

export const GOTO_MESSAGE_EDIT = "message/edit"
export const createActionGotoMessageEdit = (messageId: string) => push(`/app/message/${messageId}`)

export const MESSAGE_UPVOTE = "message/upvote"
export const createActionMessageUpvote = (messageId: string) => ({
    type: MESSAGE_UPVOTE,
    payload: {
        messageId: messageId,
    },
})

export const MESSAGE_DOWNVOTE = "message/downvote"
export const createActionMessageDownvote = (messageId: string) => ({
    type: MESSAGE_DOWNVOTE,
    payload: {
        messageId: messageId,
    },
})

export const MESSAGE_ADJUST_VOTES = "message/adjustVotes"
export const createActionMessageAdjustVotes = (messageId: string, addVotes: number) => ({
    type: MESSAGE_ADJUST_VOTES,
    payload: {
        messageId: messageId,
        addVotes: addVotes,
    },
})

export const MESSAGE_ADJUST_VOTES_SUCCESS = "message/adjustVotes/success"
export const createActionMessageAdjustVotesSuccess = (channelId: string, message: Message) => ({
    type: MESSAGE_ADJUST_VOTES_SUCCESS,
    payload: {
        channelId: channelId,
        message: message,
    },
})
