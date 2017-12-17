// @flow

import type { EpicDeps } from "../utils/configureEpics"
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
