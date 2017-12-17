// @flow

import { MESSAGE_SEARCH_TEXT_CHANGED } from "../../actions/messages"


export const messageSearchReducer = (state: string = "", action: Object) => {
    switch (action.type) {
        case MESSAGE_SEARCH_TEXT_CHANGED:
            return action.payload.text

        default:
            return state
    }
}
