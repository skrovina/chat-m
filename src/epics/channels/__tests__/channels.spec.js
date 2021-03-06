import { ActionsObservable } from "redux-observable"
import Rx from "rxjs"
import { marbles } from "rxjs-marbles"

import { getHttpHeaders } from "../../../selectors/httpHeaders"
import * as F from "../../../test/fixtures"
import * as E from "../channels"
import { getChannelMessages } from "../../../api/httpRequests"
import {
    createActionChannelsSelect,
} from "../../../actions/channels/channels"
import {
    createActionChannelMessagesReceived,
    createActionChannelMessagesSync, createActionChannelMessagesSyncFailure,
} from "../../../actions/messages"
import { messageToMessageDTO } from "../../../modelTransform/message"

jest.mock("redux-form")
jest.mock("../../../api/httpRequests")
jest.mock("../../../selectors/httpHeaders")
jest.mock("../../../selectors/users")


const epicDeps = {
    getState: () => ({}),
}

describe("channelMessagesSync", () => {
    getHttpHeaders.mockReturnValue(F.headersFixture)

    it("should sync all the channel's messages", marbles((m) => {
        const channelId = "channel-id-1"
        const action$ = m.hot("-^-a-", {
            a: createActionChannelMessagesSync(channelId),
        })
        const expected = m.hot("--b-", {
            b: createActionChannelMessagesReceived(channelId, F.messagesArray),
        })

        getChannelMessages.mockReturnValue([F.messagesArray.map(messageToMessageDTO)])

        const result = E.channelMessagesSync(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
    it("should error if request fails", marbles((m) => {
        const channelId = "channel-id-1"
        const action$ = m.hot("-^-a-", {
            a: createActionChannelMessagesSync(channelId),
        })
        const expected = m.hot("--b-", {
            b: createActionChannelMessagesSyncFailure(),
        })

        getChannelMessages.mockReturnValue(Rx.Observable.throw({}))

        const result = E.channelMessagesSync(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("channelsSelect", () => {
    it("should sync messages when channel is selected", marbles((m) => {
        const channelId = "channel-id-1"
        const action$ = m.hot("-^-a-", {
            a: createActionChannelsSelect(channelId),
        })
        const expected = m.hot("--b-", {
            b: createActionChannelMessagesSync(channelId),
        })

        const result = E.channelsSelect(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})
