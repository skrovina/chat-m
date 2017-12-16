// @flow

import Rx from "rxjs"
import { getFormValues } from "redux-form"
import type { EpicDeps } from "../utils/configureEpics"
import { createActionLoginAuthorized, LOGIN_AUTHORIZED, LOGIN_REQUESTED } from "../actions/login"
import { getAllUsers, logIn } from "../api/httpRequests"
import { getHttpHeaders } from "../selectors/httpHeaders"
import { LOGOUT } from "../actions/logout"

const logoutDeleteAuth = (action$: Object, deps: EpicDeps) =>
    action$.ofType(LOGOUT)
        .switchMap(() => {
            localStorage.removeItem("auth")

            return []
        })

export default [
    logoutDeleteAuth,
]
