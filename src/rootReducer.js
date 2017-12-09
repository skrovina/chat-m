// @flow

import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"


export type StateObject = {
    routing: Object,
}

export const rootReducer = combineReducers({
    routing: routerReducer,
})
