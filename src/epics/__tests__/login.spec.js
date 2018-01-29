import { ActionsObservable } from "redux-observable"
import Rx from "rxjs"
import { marbles } from "rxjs-marbles"

import { getFormValues, startSubmit, stopSubmit } from "redux-form"
import {
    createActionLoginAuthorized,
    createActionLoginErrorNotRegistered,
    createActionLoginRequested,
    createActionSignupErrorAlreadyExists,
    createActionSignupRequested,
    createActionSignupSuccess,
} from "../../actions/login"
import { getHttpHeaders } from "../../selectors/httpHeaders"
import { logIn, registerUser } from "../../api/httpRequests"
import {
    loginAuthorizedDownloadData,
    loginAuthorizedSaveAuth,
    logInEpic,
    logInSubmit,
    signUpEpic,
    signUpSuccessNotify,
    signUpSync,
} from "../login"
import {
    authFixture,
    emailFixture,
    headersFixture,
    nameFixture,
    tokenFixture,
    user,
    userDTO,
} from "../../test/fixtures"
import { createActionUserUpdate } from "../../actions/users"
import { createActionSyncStart } from "../../actions/sync"
import { createActionShowSuccess } from "../../actions/notificationDisplay"


jest.mock("redux-form")
jest.mock("../../api/httpRequests")
jest.mock("../../selectors/httpHeaders")

const epicDeps = {
    getState: () => ({}),
}

describe("logInEpic", () => {
    getFormValues.mockImplementation(formName =>
        (formName === "login"
            ? ((state) => ({
                email: emailFixture,
            }))
            : undefined))

    getHttpHeaders.mockImplementation(state => headersFixture)

    it("should authorize correctly", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionLoginRequested(),
        })
        const expected = m.hot("--b-", {
            b: createActionLoginAuthorized(authFixture),
        })

        logIn.mockImplementation((eMail, h) => [tokenFixture])

        const result = logInEpic(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
    it("should error if request fails", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionLoginRequested(),
        })
        const expected = m.hot("--(cb)-", {
            b: createActionLoginErrorNotRegistered(authFixture),
            c: stopSubmit("login"),
        })

        logIn.mockReturnValue(Rx.Observable.throw({ status: 400 }))

        const result = logInEpic(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("logInSubmit", () => {
    it("should submit", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionLoginRequested(),
        })
        const expected = m.hot("--b-", {
            b: startSubmit("login"),
        })

        const result = logInSubmit(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("loginAuthorizedSaveAuth", () => {
    it("should submit", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionLoginAuthorized(authFixture),
        })
        const expected = m.hot("----")

        const localStorage = {
            setItem: jest.fn(() => {}),
        }

        const epic = loginAuthorizedSaveAuth(localStorage)
        const result = epic(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)

        return Promise.resolve().then(() => {
            expect(localStorage.setItem)
                .toHaveBeenCalledWith("auth", JSON.stringify(authFixture))
        })
    }))
})

describe("signUpEpic", () => {
    getFormValues.mockImplementation(formName =>
        (formName === "login"
            ? ((state) => ({
                email: emailFixture,
                name: nameFixture,
            }))
            : undefined))
    const epic = signUpEpic

    it("should signup", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionSignupRequested(),
        })
        const expected = m.hot("--b-", {
            b: createActionSignupSuccess(user),
        })

        registerUser.mockImplementation(() => [userDTO])

        const result = epic(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)

        return Promise.resolve().then(() => {
            expect(getFormValues)
                .toHaveBeenCalledWith("login")
        })
    }))
    it("should error signup on failure", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionSignupRequested(),
        })
        const expected = m.hot("--(cb)-", {
            b: createActionSignupErrorAlreadyExists(user),
            c: stopSubmit("login"),
        })

        registerUser.mockReturnValue(Rx.Observable.throw({ status: 400 }))

        const result = epic(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)

        return Promise.resolve().then(() => {
            expect(getFormValues)
                .toHaveBeenCalledWith("login")
        })
    }))
})

describe("signUpSync", () => {
    it("should submit", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionSignupSuccess(user),
        })
        const expected = m.hot("--b-", {
            b: createActionUserUpdate(user),
        })

        const result = signUpSync(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("loginAuthorizedDownloadData", () => {
    it("should submit", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionLoginAuthorized(),
        })
        const expected = m.hot("--b-", {
            b: createActionSyncStart(),
        })

        const result = loginAuthorizedDownloadData(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("signUpSuccessNotify", () => {
    it("should submit", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionSignupSuccess(),
        })
        const expected = m.hot("--b-", {
            b: createActionShowSuccess("Successfully signed up, you can log in now."),
        })

        const result = signUpSuccessNotify(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})
