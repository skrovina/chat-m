// @flow


import { LOADING_ENDED, LOADING_STARTED } from "../actions/loading"

export const loadingReducer = (state: boolean = false, action: Object) => {
    switch (action.type) {
        case LOADING_STARTED:
            return true

        case LOADING_ENDED:
            return false

        default:
            return state
    }
}
