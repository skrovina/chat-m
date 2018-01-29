import { ActionsObservable } from "redux-observable"
import "rxjs"
import { marbles } from "rxjs-marbles"

import * as R from "ramda"
import * as E from "../sync"
import * as F from "../../test/fixtures"
import { createActionAppLoaded } from "../../actions/app"
import { createActionSyncFire, createActionSyncStart } from "../../actions/sync"
import { getHttpHeaders } from "../../selectors/httpHeaders"
import { getAllUsers, getChannels } from "../../api/httpRequests"
import { createActionUsersSync } from "../../actions/users"
import { createActionChannelsSync } from "../../actions/channels/channels"
import { createActionChannelMessagesSync } from "../../actions/messages"
import { getUserChannels } from "../../selectors/channels"
import { getAuth } from "../../selectors/auth"

jest.mock("../../api/httpRequests")
jest.mock("../../selectors/httpHeaders")
jest.mock("../../selectors/channels")
jest.mock("../../selectors/auth")

const epicDeps = {
    getState: () => ({}),
}

describe("syncStart", () => {
    it("should start synchronization after app loads", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionAppLoaded(),
        })
        const expected = m.hot("--b-", {
            b: createActionSyncStart(),
        })

        const result = E.syncStart(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("syncFire", () => {
    it("should fire synchronization every 'period' seconds", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionSyncStart(),
        })
        const expected = m.hot("--b-b-b-(b|)", {
            b: createActionSyncFire(),
        })

        getAuth.mockReturnValue(F.authFixture)

        const result = E.syncFire(m.time("--|"), m.scheduler)(new ActionsObservable(action$), epicDeps)
        m.expect(result.take(4)).toBeObservable(expected)
    }))
})

describe("syncUsers", () => {
    it("should sync users on fire synchronization ", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionSyncFire(),
        })
        const expected = m.hot("--b-", {
            b: createActionUsersSync(R.assoc(F.user.email, F.user, {})),
        })

        getHttpHeaders.mockReturnValue(F.headersFixture)
        getAllUsers.mockReturnValue([[F.userDTO]])

        const result = E.syncUsers(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("syncChannels", () => {
    it("should sync channels on fire synchronization", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionSyncFire(),
        })
        const expected = m.hot("--b-", {
            b: createActionChannelsSync(R.assoc(F.channel.id, F.channel, {})),
        })

        getHttpHeaders.mockReturnValue(F.headersFixture)
        getChannels.mockReturnValue([[F.channelDTO]])

        const result = E.syncChannels(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("syncMessages", () => {
    it("should sync channels on fire synchronization", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionChannelsSync(R.assoc(F.channel.id, F.channel, {})),
        })
        const expected = m.hot("--b-", {
            b: createActionChannelMessagesSync(F.channel.id),
        })

        getUserChannels.mockReturnValue([F.channel])

        const result = E.syncMessages(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})
