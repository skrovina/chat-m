import { ActionsObservable } from "redux-observable"
import "rxjs"
import { marbles } from "rxjs-marbles"

import { getFormValues } from "redux-form"
import {
    createActionEditMessageSubmit,
    createActionChannelMessageSentSuccess,
    createActionEditMessagePostSuccess,
    createActionMessageAdjustVotes,
    createActionMessageAdjustVotesSuccess,
    createActionMessageComposeSend,
    createActionMessageComposeSent,
    createActionMessageDownvote,
    createActionMessageUpvote, createActionDeleteMessagePostSuccess,
} from "../../actions/messages"
import { getSignedInUserEmail } from "../../selectors/users"
import {
    editedMessage,
    editedMessageDTO,
    emailFixture,
    headersFixture,
    idFixture,
    message,
    messageBodyFixture,
    messageDTO,
    upvotedMessage,
    upvotedMessageDTO,
} from "../../test/fixtures"
import {
    adjustVotes, deletePostSuccessCloseModal, downvoteMessage, editMessage, editPostSuccessCloseModal, sendMessage,
    sentMessage,
    upvoteMessage,
} from "../messages"
import {
    getActiveChannelId,
    getActiveChannelNewMessageText,
} from "../../selectors/activeChannelSelectors"
import { getHttpHeaders } from "../../selectors/httpHeaders"
import { createMessage } from "../../entityCreators/message"
import { postChannelMessage, updateChannelMessage } from "../../api/httpRequests"
import { getChannelMessageById } from "../../selectors/channelMessages"
import { createActionModalDismiss } from "../../actions/channels/addChannel"


jest.mock("redux-form")
jest.mock("../../api/httpRequests")
jest.mock("../../selectors/httpHeaders")
jest.mock("../../selectors/users")
jest.mock("../../selectors/activeChannelSelectors")
jest.mock("../../entityCreators/message")
jest.mock("../../selectors/channelMessages")

const epicDeps = {
    getState: () => ({}),
}

describe("sendMessage", () => {
    it("should be sent successfully", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionMessageComposeSend(),
        })
        const expected = m.hot("--b-", {
            b: createActionChannelMessageSentSuccess("channel-id-1", message),
        })

        const channelId = "channel-id-1"
        getSignedInUserEmail.mockImplementation(() => emailFixture)
        getActiveChannelId.mockImplementation(() => channelId)
        getActiveChannelNewMessageText.mockImplementation(() => messageBodyFixture)
        getHttpHeaders.mockImplementation(() => headersFixture)
        createMessage.mockImplementation(() => message)
        postChannelMessage.mockImplementation(() => [messageDTO])

        const result = sendMessage(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)

        return Promise.resolve().then(() => {
            expect(createMessage)
                .toHaveBeenCalledWith(messageBodyFixture, emailFixture)
            expect(postChannelMessage)
                .toHaveBeenCalledWith(channelId, messageDTO, headersFixture)
        })
    }))
})

describe("sentMessage", () => {
    it("should be sent successfully", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionMessageComposeSend(),
        })
        const expected = m.hot("--b-", {
            b: createActionMessageComposeSent(),
        })

        const result = sentMessage(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("upvoteMessage", () => {
    it("should adjust votes +1", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionMessageUpvote(idFixture),
        })
        const expected = m.hot("--b-", {
            b: createActionMessageAdjustVotes(idFixture, 1),
        })

        const result = upvoteMessage(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("downvoteMessage", () => {
    it("should adjust votes -1", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionMessageDownvote(idFixture),
        })
        const expected = m.hot("--b-", {
            b: createActionMessageAdjustVotes(idFixture, -1),
        })

        const result = downvoteMessage(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("adjustVotes", () => {
    it("should adjust votes", marbles((m) => {
        const channelId = "channel-id-1"

        const action$ = m.hot("-^-a-", {
            a: createActionMessageAdjustVotes(idFixture, 1),
        })
        const expected = m.hot("--b-", {
            b: createActionMessageAdjustVotesSuccess(channelId, upvotedMessage),
        })

        getChannelMessageById.mockImplementation(() => [channelId, message])
        getHttpHeaders.mockImplementation(() => headersFixture)
        updateChannelMessage.mockImplementation(() => [upvotedMessageDTO])


        const result = adjustVotes(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("deleteMessage", () => {
    it("should delete message", marbles((m) => {
        const channelId = "channel-id-1"

        const action$ = m.hot("-^-a-", {
            a: createActionMessageAdjustVotes(idFixture, 1),
        })
        const expected = m.hot("--b-", {
            b: createActionMessageAdjustVotesSuccess(channelId, upvotedMessage),
        })

        getChannelMessageById.mockImplementation(() => [channelId, message])
        getHttpHeaders.mockImplementation(() => headersFixture)
        updateChannelMessage.mockImplementation(() => [upvotedMessageDTO])


        const result = adjustVotes(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("editMessage", () => {
    it("should edit message", marbles((m) => {
        const channelId = "channel-id-1"

        const action$ = m.hot("-^-a-", {
            a: createActionEditMessageSubmit("message-id-1"),
        })
        const expected = m.hot("--b-", {
            b: createActionEditMessagePostSuccess(channelId, editedMessage),
        })

        getChannelMessageById.mockImplementation(() => [channelId, message])
        getHttpHeaders.mockImplementation(() => headersFixture)
        updateChannelMessage.mockImplementation(() => [editedMessageDTO])
        getFormValues.mockImplementation(formName =>
            (formName === "edit-message"
                ? ((state) => ({
                    body: editedMessage.value,
                }))
                : undefined))


        const result = editMessage(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("deletePostSuccessCloseModal", () => {
    it("should close modal", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionDeleteMessagePostSuccess("channel-id-1", "message-id-1"),
        })
        const expected = m.hot("--b-", {
            b: createActionModalDismiss(),
        })

        const result = deletePostSuccessCloseModal(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("editPostSuccessCloseModal", () => {
    it("should close modal", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionEditMessagePostSuccess("channel-id-1", message),
        })
        const expected = m.hot("--b-", {
            b: createActionModalDismiss(),
        })

        const result = editPostSuccessCloseModal(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})
