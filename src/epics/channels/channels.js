// @flow

import Rx from "rxjs"
import { getFormValues } from "redux-form"
import type { EpicDeps } from "../../utils/configureEpics"
import { CHANNELS_GOTO_ADD, CHANNELS_SELECT } from "../../actions/channels/channels"


const gotoAdd = (action$: Object, deps: EpicDeps) =>
    action$.ofType(CHANNELS_GOTO_ADD)
        .map(() => ({ type: "" }))

const channelsSelect = (action$: Object, deps: EpicDeps) =>
    action$.ofType(CHANNELS_SELECT)
        .map(() => ({ type: "" }))


export default [
    gotoAdd,
]
