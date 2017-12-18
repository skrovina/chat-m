// @flow

import { createActionShowNotification, SHOW_NOTIFICATION } from "../actions/notificationDisplay"
import type { EpicDeps } from "../utils/configureEpics"


const resetError = (action$: Object, deps: EpicDeps) =>
    action$.ofType(SHOW_NOTIFICATION)
        .concatMap(({ payload: { notification } }) =>
            (notification !== null
                ? [createActionShowNotification(null)]
                : []))


export default [
    resetError,
]
