import { ActionsObservable } from "redux-observable"
import "rxjs"
import { marbles } from "rxjs-marbles"

import { authFixture } from "../../test/fixtures"
import { logoutDeleteAuth } from "../logout"
import { createActionLogOut } from "../../actions/logout"


jest.mock("redux-form")
jest.mock("../../api/httpRequests")
jest.mock("../../selectors/httpHeaders")

const epicDeps = {
    getState: () => ({}),
}

describe("logoutDeleteAuth", () => {
    it("should delete auth from storage", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionLogOut(authFixture),
        })
        const expected = m.hot("----")

        const localStorage = {
            removeItem: jest.fn(() => {}),
        }

        const epic = logoutDeleteAuth(localStorage)
        const result = epic(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)

        return Promise.resolve().then(() => {
            expect(localStorage.removeItem)
                .toHaveBeenCalledWith("auth")
        })
    }))
})
