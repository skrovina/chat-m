// @flow

import type { StateObject } from "../reducers/app"
import type { NotificationMessageType } from "../reducers/notificationMessage"

export const getNotification = (state: StateObject): ?NotificationMessageType =>
    state.notification
