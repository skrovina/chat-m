// @flow

import type { Message } from "../../types"


export type MessagesStateObject = { [key: string]: Message }

export const messagesReducer = (state: MessagesStateObject = {}, action: Object) => {
    switch (action.type) {
        default:
            return state
    }
}
