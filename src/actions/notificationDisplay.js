// @flow

import type { NotificationMessageType } from "../reducers/notificationMessage"

export const SHOW_NOTIFICATION = "notificationDisplay/show"
export const createActionShowNotification = (notification: ?NotificationMessageType) => ({
    type: SHOW_NOTIFICATION,
    payload: {
        notification: notification,
    },
})

export const createActionShowError = (errorMessage: string) =>
    createActionShowNotification({ type: "error", content: errorMessage })

export const createActionShowSuccess = (message: string) =>
    createActionShowNotification({ type: "success", content: message })
