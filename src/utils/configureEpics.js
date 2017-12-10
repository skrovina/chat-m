// @flow

import { combineEpics } from "redux-observable"
import { epics } from "../epics"
import type { StateObject } from "../reducers/app"


export type EpicDeps = {
    getState: () => StateObject,
    dispatch: ({ type: string }) => void,
}

export const configureEpics = (deps: Object) =>
    (action$: Object, miniStore: Object) => combineEpics(...epics)(action$, { ...deps, ...miniStore })
