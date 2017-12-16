// @flow

import Rx from "rxjs"
import { getFormValues } from "redux-form"
import type { EpicDeps } from "../utils/configureEpics"
import { createActionLoginAuthorized, LOGIN_AUTHORIZED, LOGIN_REQUESTED } from "../actions/login"
import { logIn } from "../api/httpRequests"
import { getHttpHeaders } from "../selectors/httpHeaders"
import { createActionSyncStart } from "../actions/sync"


const logInEpic = (action$: Object, deps: EpicDeps) =>
    action$.ofType(LOGIN_REQUESTED)
        .switchMap(() => {
            const { email } = getFormValues("login")(deps.getState())
            const headers = getHttpHeaders(deps.getState())
            if (!email) {
                throw new Error("Cannot get email from form")
            }

            return Rx.Observable.from(logIn(email, headers))
                .map((token) => [token, email])
        })
        .map(([token, email]) => createActionLoginAuthorized({ token: token, email: email }))

const loginAuthorizedSaveAuth = (action$: Object, deps: EpicDeps) =>
    action$.ofType(LOGIN_AUTHORIZED)
        .switchMap((action) => {
            const { payload: { auth } } = action
            localStorage.setItem("auth", JSON.stringify(auth))

            return []
        })

const loginAuthorizedDownloadData = (action$: Object, deps: EpicDeps) =>
    action$.ofType(LOGIN_AUTHORIZED)
        .map(() => createActionSyncStart())


export default [
    logInEpic,
    loginAuthorizedSaveAuth,
    loginAuthorizedDownloadData,
]
