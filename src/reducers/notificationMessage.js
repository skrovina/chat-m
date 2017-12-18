// @flow

import { SHOW_NOTIFICATION } from "../actions/notificationDisplay"

export type NotificationMessageType = {
    type: "error" | "success" | "warning",
    content: string,
}

export const notificationMessageReducer = (state: ?NotificationMessageType = null, action: Object) => {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return action.payload.notification

        default:
            return state
    }
}
