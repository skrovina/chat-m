// @flow

import type { EpicDeps } from "../utils/configureEpics"
import { LOGOUT } from "../actions/logout"


export const logoutDeleteAuth = (localStorage: Object) =>
    (action$: Object, deps: EpicDeps) =>
        action$.ofType(LOGOUT)
            .switchMap(() => {
                localStorage.removeItem("auth")

                return []
            })

export default [
    logoutDeleteAuth(process.env.NODE_ENV === "test" ? {} : localStorage),
]
