import { ActionsObservable } from "redux-observable"
import "rxjs"
import { marbles } from "rxjs-marbles"

import * as R from "ramda"

import { getFormValues } from "redux-form"
import { getHttpHeaders } from "../../../selectors/httpHeaders"
import * as F from "../../../test/fixtures"
import * as E from "../addChannel"
import { getSignedInUserEmail } from "../../../selectors/users"
import {
    createActionAddChannelPost, createActionAddChannelPostSuccess,
    createActionAddChannelSubmit, createActionModalDismiss,
} from "../../../actions/channels/addChannel"
import { addChannel } from "../../../api/httpRequests"
import { createActionChannelsSync } from "../../../actions/channels/channels"

jest.mock("redux-form")
jest.mock("../../../api/httpRequests")
jest.mock("../../../selectors/httpHeaders")
jest.mock("../../../selectors/users")


const epicDeps = {
    getState: () => ({}),
}

describe("submit", () => {
    it("should create post action", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionAddChannelSubmit(),
        })
        const expected = m.hot("--b-", {
            b: createActionAddChannelPost(F.newChannel),
        })

        getFormValues.mockImplementation(formName =>
            (formName === "add-channel"
                ? ((state) => ({
                    name: F.channel.name,
                }))
                : undefined))

        getHttpHeaders.mockReturnValue(F.headersFixture)
        getSignedInUserEmail.mockReturnValue(F.user.email)

        const result = E.submit(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("post", () => {
    it("should post the submission correctly", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionAddChannelPost(F.newChannel),
        })
        const expected = m.hot("--b-", {
            b: createActionAddChannelPostSuccess([F.channelDTO]),
        })

        getFormValues.mockImplementation(formName =>
            (formName === "add-channel"
                ? ((state) => ({
                    name: F.channel.name,
                }))
                : undefined))

        getHttpHeaders.mockReturnValue(F.headersFixture)
        getSignedInUserEmail.mockReturnValue(F.user.email)
        addChannel.mockReturnValue([[F.channelDTO]])

        const result = E.post(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("postSuccessSync", () => {
    it("should sync state after successful post", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionAddChannelPostSuccess([F.channelDTO]),
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
            a: createActionAddChannelPostSuccess([F.channelDTO]),
        })
        const expected = m.hot("--b-", {
            b: createActionModalDismiss(),
        })

        const result = E.postSuccessCloseModal(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})
