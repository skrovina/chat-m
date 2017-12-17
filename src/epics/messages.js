// @flow

import Rx from "rxjs"
import { getFormValues } from "redux-form"
import {
    createActioEditMessagePostSuccess,
    createActionChannelMessageSentSuccess, createActionDeleteMessagePostSuccess, createActionMessageAdjustVotes,
    createActionMessageAdjustVotesSuccess,
    createActionMessageComposeSent, DELETE_MESSAGE_POST_SUCCESS, DELETE_MESSAGE_SUBMIT, EDIT_MESSAGE_POST_SUCCESS,
    EDIT_MESSAGE_SUBMIT,
    MESSAGE_ADJUST_VOTES,
    MESSAGE_COMPOSE_SEND, MESSAGE_DOWNVOTE, MESSAGE_UPVOTE,
} from "../actions/messages"
import { getActiveChannelId, getActiveChannelNewMessageText } from "../selectors/activeChannelx"
import { createMessage } from "../entityCreators/message"
import { getSignedInUserEmail } from "../selectors/users"
import { messageDTOToMessage, messageToMessageDTO } from "../modelTransform/message"
import { deleteChannelMessage, postChannelMessage, updateChannelMessage } from "../api/httpRequests"
import type { EpicDeps } from "../utils/configureEpics"
import { getHttpHeaders } from "../selectors/httpHeaders"
import type { Message, MessageDTO } from "../types"
import { getChannelMessageById } from "../selectors/channelMessages"
import { adjustMessageVotes, updateMessageValue } from "../utils/entityFunctions"
import { createActionModalDismiss } from "../actions/channels/addChannel"


const sendMessage = (action$: Object, deps: EpicDeps) =>
    action$.ofType(MESSAGE_COMPOSE_SEND)
        .concatMap(() => {
            const email = getSignedInUserEmail(deps.getState())
            const channelId = getActiveChannelId(deps.getState())
            if (!channelId || !email) {
                return []
            }

            const text = getActiveChannelNewMessageText(deps.getState())
            const message = createMessage(text, email)
            const messageDTO = messageToMessageDTO(message)
            const headers = getHttpHeaders(deps.getState())

            return Rx.Observable.from(postChannelMessage(channelId, messageDTO, headers))
                .map(m => [channelId, m])
        })
        .map(([channelId, messageDTO]: [string, MessageDTO]) => {
            return createActionChannelMessageSentSuccess(
                channelId,
                messageDTOToMessage(messageDTO),
            )
        })
        .catch((e) => {
            console.log(e)
            return []
        })

const sentMessage = (action$: Object, deps: EpicDeps) =>
    action$.ofType(MESSAGE_COMPOSE_SEND)
        .map(() => createActionMessageComposeSent())

const upvoteMessage = (action$: Object, deps: EpicDeps) =>
    action$.ofType(MESSAGE_UPVOTE)
        .map(({ payload: { messageId } }) => createActionMessageAdjustVotes(messageId, 1))

const downvoteMessage = (action$: Object, deps: EpicDeps) =>
    action$.ofType(MESSAGE_DOWNVOTE)
        .map(({ payload: { messageId } }) => createActionMessageAdjustVotes(messageId, -1))


const adjustVotes = (action$: Object, deps: EpicDeps) =>
    action$.ofType(MESSAGE_ADJUST_VOTES)
        .concatMap((action) => {
            const { messageId, addVotes } = action.payload
            const channelMessage: ?[string, Message] = getChannelMessageById(messageId, deps.getState())

            if (!channelMessage) {
                return []
            }
            const [channelId, message] = channelMessage
            const adjustedMessage = adjustMessageVotes(message, addVotes)
            const messageDTO = messageToMessageDTO(adjustedMessage)

            const headers = getHttpHeaders(deps.getState())

            return Rx.Observable.from(updateChannelMessage(channelId, messageDTO, headers))
                .map(m => [channelId, m])
        })
        .map(([channelId, messageDTO]: [string, MessageDTO]) => {
            const message = messageDTOToMessage(messageDTO)

            return createActionMessageAdjustVotesSuccess(channelId, message)
        })
        .catch((e) => {
            console.log(e)
            return []
        })


const deleteMessage = (action$: Object, deps: EpicDeps) =>
    action$.ofType(DELETE_MESSAGE_SUBMIT)
        .concatMap((action) => {
            const { messageId } = action.payload
            const channelMessage: ?[string, Message] = getChannelMessageById(messageId, deps.getState())

            if (!channelMessage) {
                return []
            }
            const channelId = channelMessage[0]
            const headers = getHttpHeaders(deps.getState())


            return Rx.Observable.from(deleteChannelMessage(channelId, messageId, headers))
                .map(() => [channelId, messageId])
        })
        .map(([channelId, messageId]: [string, string]) => createActionDeleteMessagePostSuccess(channelId, messageId))
        .catch((e) => {
            console.log(e)
            return []
        })

const editMessage = (action$: Object, deps: EpicDeps) =>
    action$.ofType(EDIT_MESSAGE_SUBMIT)
        .concatMap((action) => {
            const { messageId } = action.payload
            const channelMessage: ?[string, Message] = getChannelMessageById(messageId, deps.getState())
            if (!channelMessage) {
                return []
            }
            const { body } = getFormValues("edit-message")(deps.getState())
            if (!body) {
                throw new Error("Cannot get 'body' from form!")
            }

            const [channelId, message] = channelMessage

            const headers = getHttpHeaders(deps.getState())
            const updatedMessage: Message = updateMessageValue(message, body)
            const messageDTO = messageToMessageDTO(updatedMessage)

            return Rx.Observable.from(updateChannelMessage(channelId, messageDTO, headers))
                .map(m => [channelId, m])
        })
        .map(([channelId, messageDTO]: [string, MessageDTO]) => {
            const message = messageDTOToMessage(messageDTO)

            return createActioEditMessagePostSuccess(channelId, message)
        })
        .catch((e) => {
            console.log(e)
            return []
        })


const deletePostSuccessCloseModal = (action$: Object, deps: EpicDeps) =>
    action$.ofType(DELETE_MESSAGE_POST_SUCCESS)
        .map(() => createActionModalDismiss())


const editPostSuccessCloseModal = (action$: Object, deps: EpicDeps) =>
    action$.ofType(EDIT_MESSAGE_POST_SUCCESS)
        .map(() => createActionModalDismiss())


export default [
    sendMessage,
    sentMessage,
    downvoteMessage,
    upvoteMessage,
    adjustVotes,
    deleteMessage,
    deletePostSuccessCloseModal,
    editMessage,
    editPostSuccessCloseModal,
]
