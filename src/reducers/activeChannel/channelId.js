// @flow

import { CHANNELS_SELECT } from "../../actions/channels/channels"

export const channelIdReducer = (state: ?string = null, action: Object) => {
    switch (action.type) {
        case CHANNELS_SELECT:
            return action.payload.channelId

        default:
            return state
    }
}
