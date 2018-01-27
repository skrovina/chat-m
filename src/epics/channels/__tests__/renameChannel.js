import { ActionsObservable } from "redux-observable"
import "rxjs"
import { marbles } from "rxjs-marbles"

import * as R from "ramda"
import { getFormValues } from "redux-form"

import { getHttpHeaders } from "../../../selectors/httpHeaders"
import * as F from "../../../test/fixtures"
import * as E from "../renameChannel"
import {
    createActionModalDismiss,
} from "../../../actions/channels/addChannel"
import { updateChannel } from "../../../api/httpRequests"
import {
    createActionChannelsSync,
    createActionRenameChannelPost,
    createActionRenameChannelPostSuccess,
    createActionRenameChannelSubmit,
} from "../../../actions/channels/channels"
import { getActiveChannel } from "../../../selectors/activeChannelSelectors"
import { renameChannel } from "../../../utils/entityFunctions"

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
        const renamedName = "Renamed Channel Name"

        const action$ = m.hot("-^-a-", {
            a: createActionRenameChannelSubmit(),
        })
        const expected = m.hot("--b-", {
            b: createActionRenameChannelPost(renameChannel(F.channel, renamedName)),
        })

        getFormValues.mockImplementation(formName =>
            (formName === "rename-channel"
                ? ((state) => ({
                    name: renamedName,
                }))
                : undefined))
        getActiveChannel.mockReturnValue(F.channel)

        const result = E.submit(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("post", () => {
    it("should post the submission correctly", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionRenameChannelPost(F.channel),
        })
        const expected = m.hot("--b-", {
            b: createActionRenameChannelPostSuccess([F.channelDTO]),
        })

        getHttpHeaders.mockReturnValue(F.headersFixture)
        updateChannel.mockReturnValue([[F.channelDTO]])

        const result = E.post(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("postSuccessSync", () => {
    it("should sync state after successful post", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionRenameChannelPostSuccess([F.channelDTO]),
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
            a: createActionRenameChannelPostSuccess([F.channelDTO]),
        })
        const expected = m.hot("--b-", {
            b: createActionModalDismiss(),
        })

        const result = E.postSuccessCloseModal(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})
