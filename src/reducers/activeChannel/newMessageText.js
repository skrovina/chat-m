// @flow

import { MESSAGE_COMPOSE_SENT, MESSAGE_COMPOSE_TEXT_CHANGED } from "../../actions/messages"


export const newMessageTextReducer = (state: string = "", action: Object) => {
    switch (action.type) {
        case MESSAGE_COMPOSE_TEXT_CHANGED:
            return action.payload.text

        case MESSAGE_COMPOSE_SENT:
            return ""

        default:
            return state
    }
}
