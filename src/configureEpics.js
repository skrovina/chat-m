// @flow

import { combineEpics } from "redux-observable"
import type { StateObject } from "./rootReducer"


export type EpicDeps = {
    getState: () => StateObject,
    dispatch: ({ type: string }) => void,
}

const epics = [
]

export const configureEpics = (deps: Object) =>
    (action$: Object, miniStore: Object) => combineEpics(...epics)(action$, { ...deps, ...miniStore })
