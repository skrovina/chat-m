// @flow

import Rx from "rxjs"
import { APP_LOADED } from "../actions/app"
import type { EpicDeps } from "../utils/configureEpics"


const loadOnStartup = (action$: Object, deps: EpicDeps) =>
    action$.ofType(APP_LOADED)
        .switchMap(() => Rx.Observable.from([{ type: "loadallfjfkjfk" }]))


export default [
    loadOnStartup,
]
