import { ActionsObservable } from "redux-observable"
import Rx from "rxjs"
import { marbles } from "rxjs-marbles"

import * as R from "ramda"
import { getFormValues } from "redux-form"

import { getHttpHeaders } from "../../../selectors/httpHeaders"
import * as F from "../../../test/fixtures"
import * as E from "../inviteChannel"
import { getSignedInUserEmail } from "../../../selectors/users"
import {
    createActionModalDismiss,
} from "../../../actions/channels/addChannel"
import { updateChannel } from "../../../api/httpRequests"
import {
    createActionChannelsSync,
    createActionInviteChannelPost,
    createActionInviteChannelPostFailure,
    createActionInviteChannelPostSuccess,
    createActionInviteChannelSubmit,
} from "../../../actions/channels/channels"
import { getActiveChannel } from "../../../selectors/activeChannelSelectors"
import { addParticipatorToChannel } from "../../../utils/entityFunctions"

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
        const inviteEmail = "participator@example.com"

        const action$ = m.hot("-^-a-", {
            a: createActionInviteChannelSubmit(),
        })
        const expected = m.hot("--b-", {
            b: createActionInviteChannelPost(addParticipatorToChannel(F.channel, inviteEmail)),
        })

        getFormValues.mockImplementation(formName =>
            (formName === "invite-channel"
                ? ((state) => ({
                    email: inviteEmail,
                }))
                : undefined))
        getActiveChannel.mockReturnValue(F.channel)

        const result = E.submit(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("post", () => {
    getHttpHeaders.mockReturnValue(F.headersFixture)
    getSignedInUserEmail.mockReturnValue(F.user.email)

    it("should post the submission correctly", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionInviteChannelPost(F.channel),
        })
        const expected = m.hot("--b-", {
            b: createActionInviteChannelPostSuccess([F.channelDTO]),
        })

        updateChannel.mockReturnValue([[F.channelDTO]])

        const result = E.post(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
    it("should error if request fails", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionInviteChannelPost(F.channel),
        })
        const expected = m.hot("--b-", {
            b: createActionInviteChannelPostFailure(),
        })

        updateChannel.mockReturnValue(Rx.Observable.throw({}))

        const result = E.post(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("postSuccessSync", () => {
    it("should sync state after successful post", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionInviteChannelPostSuccess([F.channelDTO]),
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
            a: createActionInviteChannelPostSuccess([F.channelDTO]),
        })
        const expected = m.hot("--b-", {
            b: createActionModalDismiss(),
        })

        const result = E.postSuccessCloseModal(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})
