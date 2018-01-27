// @flow

import Rx from "rxjs"
import type { EpicDeps } from "../../utils/configureEpics"
import { createActionModalDismiss } from "../../actions/channels/addChannel"
import {
    createActionChannelsSync, createActionDeleteChannelPost, createActionDeleteChannelPostSuccess, DELETE_CHANNEL_POST,
    DELETE_CHANNEL_POST_SUCCESS,
    DELETE_CHANNEL_SUBMIT,
} from "../../actions/channels/channels"
import { getHttpHeaders } from "../../selectors/httpHeaders"
import { deleteChannel } from "../../api/httpRequests"
import type { Channel, ChannelDTO } from "../../types"
import { channelDTOToChannel, channelToChannelDTO } from "../../modelTransform/channel"
import { toAssoc } from "../../utils/collections"
import { getActiveChannel } from "../../selectors/activeChannelSelectors"


export const submit = (action$: Object, deps: EpicDeps) =>
    action$.ofType(DELETE_CHANNEL_SUBMIT)
        .map(() => {
            const channel: ?Channel = getActiveChannel(deps.getState())
            if (!channel) {
                throw new Error("No active channel!")
            }

            return createActionDeleteChannelPost(channel)
        })

export const post = (action$: Object, deps: EpicDeps) =>
    action$.ofType(DELETE_CHANNEL_POST)
        .concatMap((action) => {
            const headers = getHttpHeaders(deps.getState())
            const channel: Channel = action.payload.channel
            const channelDTO = channelToChannelDTO(channel)

            return Rx.Observable.from(deleteChannel(channelDTO, headers))
        })
        .map((channels: ChannelDTO[]) =>
            createActionDeleteChannelPostSuccess(channels))
        .catch((e) => {
            console.log(e)
            return []
        })

export const postSuccessSync = (action$: Object, deps: EpicDeps) =>
    action$.ofType(DELETE_CHANNEL_POST_SUCCESS)
        .map((action) => {
            const channels: ChannelDTO[] = action.payload.channels

            return createActionChannelsSync(toAssoc(
                channels.map((c) => channelDTOToChannel(c)),
                (c: Channel) => c.id,
            ))
        })

export const postSuccessCloseModal = (action$: Object, deps: EpicDeps) =>
    action$.ofType(DELETE_CHANNEL_POST_SUCCESS)
        .mapTo(createActionModalDismiss())


export default [
    submit,
    post,
    postSuccessSync,
    postSuccessCloseModal,
]
