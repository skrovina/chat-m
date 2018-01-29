// @flow

import { CHANNELS_SELECT, DELETE_CHANNEL_POST_SUCCESS } from "../../actions/channels/channels"
import { LOGOUT } from "../../actions/logout"

export const channelIdReducer = (state: ?string = null, action: Object) => {
    switch (action.type) {
        case CHANNELS_SELECT:
            return action.payload.channelId

        case DELETE_CHANNEL_POST_SUCCESS:
            return action.payload.channelId === state ? null : state

        case LOGOUT:
            return null

        default:
            return state
    }
}
