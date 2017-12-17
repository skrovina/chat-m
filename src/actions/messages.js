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

export const CHANNEL_MESSAGES_SYNC = "channel/messages/sync"
export const createActionChannelMessagesSync = (channelId: string) => ({
    type: CHANNEL_MESSAGES_SYNC,
    payload: {
        channelId: channelId,
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

export const EDIT_MESSAGE_SUBMIT = "message/edit/submit"
export const createActioEditMessageSubmit = (messageId: string) => ({
    type: EDIT_MESSAGE_SUBMIT,
    payload: {
        messageId: messageId,
    },
})

export const EDIT_MESSAGE_POST_SUCCESS = "message/delete/post/success"
export const createActioEditMessagePostSuccess = (channelId: string, message: Message) => ({
    type: EDIT_MESSAGE_POST_SUCCESS,
    payload: {
        channelId: channelId,
        message: message,
    },
})

export const DELETE_MESSAGE_SUBMIT = "message/delete/submit"
export const createActionDeleteMessageSubmit = (messageId: string) => ({
    type: DELETE_MESSAGE_SUBMIT,
    payload: {
        messageId: messageId,
    },
})

export const DELETE_MESSAGE_POST_SUCCESS = "message/edit/post/success"
export const createActionDeleteMessagePostSuccess = (channelId: string, messageId: string) => ({
    type: DELETE_MESSAGE_POST_SUCCESS,
    payload: {
        channelId: channelId,
        messageId: messageId,
    },
})
