// @flow

import Rx from "rxjs"
import {
    createActionChannelMessageSentSuccess, createActionMessageAdjustVotes, createActionMessageAdjustVotesSuccess,
    createActionMessageComposeSent,
    MESSAGE_ADJUST_VOTES,
    MESSAGE_COMPOSE_SEND, MESSAGE_DOWNVOTE, MESSAGE_UPVOTE,
} from "../actions/messages"
import { getActiveChannelId, getActiveChannelNewMessageText } from "../selectors/activeChannelx"
import { createMessage } from "../entityCreators/message"
import { getSignedInUserEmail } from "../selectors/users"
import { messageDTOToMessage, messageToMessageDTO } from "../modelTransform/message"
import { postChannelMessage, updateChannelMessage } from "../api/httpRequests"
import type { EpicDeps } from "../utils/configureEpics"
import { getHttpHeaders } from "../selectors/httpHeaders"
import type { Channel, Message, MessageDTO } from "../types"
import { getChannelMessagesState, getChannelMessageById } from "../selectors/channelMessages"
import { adjustMessageVotes } from "../entityFunctions/entityFunctions"


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
            console.log("ChannelId", channelId)
            console.log("messageDTO", messageDTO)
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
            console.log(adjustedMessage)
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

export default [
    sendMessage,
    sentMessage,
    downvoteMessage,
    upvoteMessage,
    adjustVotes,
]
