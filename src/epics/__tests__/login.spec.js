import { ActionsObservable } from "redux-observable"
import { marbles } from "rxjs-marbles"

import { getFormValues } from "redux-form"
import { createActionLoginAuthorized, createActionLoginRequested } from "../../actions/login"
import { getHttpHeaders } from "../../selectors/httpHeaders"
import { logIn } from "../../api/httpRequests"
import { logInEpic } from "../login"

jest.mock("redux-form")
jest.mock("../../api/httpRequests")
jest.mock("../../selectors/httpHeaders")

const epicDeps = {
    getState: () => ({}),
}

describe("logInEpic", () => {
    it("should authorize correctly", marbles((m) => {
        const token = "ajf9oiejkjef"
        const email = "test@example.com"
        const auth = { token: token, email: email }

        const action$ = m.hot("-^-a-", {
            a: createActionLoginRequested(),
        })
        const expected = m.hot("--b-", {
            b: createActionLoginAuthorized(auth),
        })

        getFormValues.mockImplementation(formName =>
            (formName === "login"
                ? ((state) => ({
                    email: email,
                }))
                : undefined))

        const headers = { "Content-Type": "application/json" }
        getHttpHeaders.mockImplementation(state => headers)
        logIn.mockImplementation((eMail, h) => [token])

        const result = logInEpic(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

