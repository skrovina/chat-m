import { ActionsObservable } from "redux-observable"
import Rx from "rxjs"
import { marbles } from "rxjs-marbles"

import { getFormValues } from "redux-form"
import { getHttpHeaders } from "../../selectors/httpHeaders"
import * as F from "../../test/fixtures"
import { updateUser } from "../../api/httpRequests"
import {
    createActionEditProfilePost,
    createActionEditProfilePostFailure,
    createActionEditProfilePostSuccess,
    createActionEditProfileSubmit,
} from "../../actions/profile"
import { getSignedUser } from "../../selectors/users"
import {
    post,
    postSuccessCloseModal,
    postSuccessSync,
    submit,
} from "../editProfile"
import { createActionUserUpdate } from "../../actions/users"
import { createActionModalDismiss } from "../../actions/channels/addChannel"


jest.mock("redux-form")
jest.mock("../../api/httpRequests")
jest.mock("../../selectors/httpHeaders")
jest.mock("../../selectors/users")

const epicDeps = {
    getState: () => ({}),
}

describe("submit", () => {
    it("should submit correctly", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionEditProfileSubmit(),
        })
        const expected = m.hot("--b-", {
            b: createActionEditProfilePost(F.editedUser),
        })

        getFormValues.mockImplementation(formName =>
            (formName === "edit-profile"
                ? ((state) => ({
                    name: F.editedUser.name,
                    avatar: { base64: F.editedUser.image },
                }))
                : undefined))

        getHttpHeaders.mockImplementation(state => F.headersFixture)
        getSignedUser.mockReturnValue(F.user)

        const result = submit(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("post", () => {
    getFormValues.mockImplementation(formName =>
        (formName === "edit-profile"
            ? ((state) => ({
                name: F.editedUser.name,
                avatar: { base64: F.editedUser.image },
            }))
            : undefined))
    getHttpHeaders.mockImplementation(state => F.headersFixture)
    getSignedUser.mockReturnValue(F.user)

    it("should post submission correctly", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionEditProfilePost(F.user),
        })
        const expected = m.hot("--b-", {
            b: createActionEditProfilePostSuccess(F.userDTO),
        })

        updateUser.mockReturnValue([F.userDTO])

        const result = post(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
    it("should error if request fails", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionEditProfilePost(F.user),
        })
        const expected = m.hot("--b-", {
            b: createActionEditProfilePostFailure(),
        })

        updateUser.mockReturnValue(Rx.Observable.throw({}))

        const result = post(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("postSuccessSync", () => {
    it("should sync after posting", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionEditProfilePostSuccess(F.userDTO),
        })
        const expected = m.hot("--b-", {
            b: createActionUserUpdate(F.user),
        })

        const result = postSuccessSync(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})

describe("postSuccessCloseModal", () => {
    it("should close modal after post success", marbles((m) => {
        const action$ = m.hot("-^-a-", {
            a: createActionEditProfilePostSuccess(F.userDTO),
        })
        const expected = m.hot("--b-", {
            b: createActionModalDismiss(),
        })

        const result = postSuccessCloseModal(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})
