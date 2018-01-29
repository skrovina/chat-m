import { ActionsObservable } from "redux-observable"
import Rx from "rxjs"
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
    createActionMessageUpvote,
    createActionDeleteMessagePostSuccess, createActionMessageComposeSendFailure, createActionMessageAdjustVotesFailure,
    createActionDeleteMessageSubmit, createActionDeleteMessagePostFailure, createActionEditMessagePostFailure,
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
    adjustVotes, deleteMessage, deletePostSuccessCloseModal, downvoteMessage, editMessage, editPostSuccessCloseModal,
    sendMessage,
    sentMessage,
    upvoteMessage,
} from "../messages"
import {
    getActiveChannelId,
    getActiveChannelNewMessageText,
} from "../../selectors/activeChannelSelectors"
import { getHttpHeaders } from "../../selectors/httpHeaders"
import { createMessage } from "../../entityCreators/message"
import { deleteChannelMessage, postChannelMessage, updateChannelMessage } from "../../api/httpRequests"
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
    const channelId = "channel-id-1"
    getSignedInUserEmail.mockImplementation(() => emailFixture)
    getActiveChannelId.mockImplementation(() => channelId)
    getActiveChannelNewMessageText.mockImplementation(() => messageBodyFixture)
    getHttpHeaders.mockImplementation(() => headersFixture)
    createMessage.mockImplementation(() => message)

    it("should be sent successfully", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionMessageComposeSend(),
        })
        const expected = m.hot("--b-", {
            b: createActionChannelMessageSentSuccess("channel-id-1", message),
        })
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
    it("should error if request fails", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionMessageComposeSend(),
        })
        const expected = m.hot("--b-", {
            b: createActionMessageComposeSendFailure(),
        })
        postChannelMessage.mockReturnValue(Rx.Observable.throw({}))

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
    const channelId = "channel-id-1"
    getChannelMessageById.mockImplementation(() => [channelId, message])
    getHttpHeaders.mockImplementation(() => headersFixture)

    it("should adjust votes", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionMessageAdjustVotes(idFixture, 1),
        })
        const expected = m.hot("--b-", {
            b: createActionMessageAdjustVotesSuccess(channelId, upvotedMessage),
        })

        updateChannelMessage.mockImplementation(() => [upvotedMessageDTO])

        const result = adjustVotes(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
    it("should error if request fails", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionMessageAdjustVotes(idFixture, 1),
        })
        const expected = m.hot("--b-", {
            b: createActionMessageAdjustVotesFailure(),
        })

        updateChannelMessage.mockReturnValue(Rx.Observable.throw({}))

        const result = adjustVotes(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("deleteMessage", () => {
    const channelId = "channel-id-1"
    getChannelMessageById.mockImplementation(() => [channelId, message])
    getHttpHeaders.mockImplementation(() => headersFixture)

    it("should delete message", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionDeleteMessageSubmit(message.id),
        })
        const expected = m.hot("--b-", {
            b: createActionDeleteMessagePostSuccess(channelId, message.id),
        })

        deleteChannelMessage.mockImplementation(() => [upvotedMessageDTO])

        const result = deleteMessage(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
    it("should error if request fails", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionDeleteMessageSubmit(message.id),
        })
        const expected = m.hot("--b-", {
            b: createActionDeleteMessagePostFailure(),
        })

        deleteChannelMessage.mockReturnValue(Rx.Observable.throw({}))

        const result = deleteMessage(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("editMessage", () => {
    const channelId = "channel-id-1"
    getChannelMessageById.mockImplementation(() => [channelId, message])
    getHttpHeaders.mockImplementation(() => headersFixture)
    getFormValues.mockImplementation(formName =>
        (formName === "edit-message"
            ? ((state) => ({
                body: editedMessage.value,
            }))
            : undefined))

    it("should edit message", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionEditMessageSubmit("message-id-1"),
        })
        const expected = m.hot("--b-", {
            b: createActionEditMessagePostSuccess(channelId, editedMessage),
        })

        updateChannelMessage.mockImplementation(() => [editedMessageDTO])

        const result = editMessage(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
    it("should error if request fails", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionEditMessageSubmit("message-id-1"),
        })
        const expected = m.hot("--b-", {
            b: createActionEditMessagePostFailure(),
        })

        updateChannelMessage.mockReturnValue(Rx.Observable.throw({}))

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
