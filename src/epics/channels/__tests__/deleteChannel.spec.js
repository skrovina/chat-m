import { ActionsObservable } from "redux-observable"
import "rxjs"
import { marbles } from "rxjs-marbles"

import * as R from "ramda"

import { getHttpHeaders } from "../../../selectors/httpHeaders"
import * as F from "../../../test/fixtures"
import * as E from "../deleteChannel"
import { getSignedInUserEmail } from "../../../selectors/users"
import {
    createActionModalDismiss,
} from "../../../actions/channels/addChannel"
import { deleteChannel } from "../../../api/httpRequests"
import {
    createActionChannelsSync, createActionDeleteChannelPost, createActionDeleteChannelPostSuccess,
    createActionDeleteChannelSubmit,
} from "../../../actions/channels/channels"
import { getActiveChannel } from "../../../selectors/activeChannelSelectors"

jest.mock("redux-form")
jest.mock("../../../api/httpRequests")
jest.mock("../../../selectors/httpHeaders")
jest.mock("../../../selectors/users")
jest.mock("../../../selectors/activeChannelSelectors")


const epicDeps = {
    getState: () => ({}),
}

describe("submit", () => {
    it("should create post action", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionDeleteChannelSubmit(),
        })
        const expected = m.hot("--b-", {
            b: createActionDeleteChannelPost(F.channel),
        })

        getActiveChannel.mockReturnValue(F.channel)

        const result = E.submit(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("post", () => {
    it("should post the submission correctly", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionDeleteChannelPost(F.channel),
        })
        const expected = m.hot("--b-", {
            b: createActionDeleteChannelPostSuccess([F.channelDTO], F.channel.id),
        })

        getHttpHeaders.mockReturnValue(F.headersFixture)
        getSignedInUserEmail.mockReturnValue(F.user.email)
        deleteChannel.mockReturnValue([[F.channelDTO]])

        const result = E.post(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("postSuccessSync", () => {
    it("should sync state after successful post", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionDeleteChannelPostSuccess([F.channelDTO]),
        })
        const expected = m.hot("--b-", {
            b: createActionChannelsSync(R.assoc(F.channel.id, F.channel, {})),
        })

        const result = E.postSuccessSync(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("postSuccessCloseModal", () => {
    it("should close modal after successful post", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionDeleteChannelPostSuccess([F.channelDTO]),
        })
        const expected = m.hot("--b-", {
            b: createActionModalDismiss(),
        })

        const result = E.postSuccessCloseModal(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})
