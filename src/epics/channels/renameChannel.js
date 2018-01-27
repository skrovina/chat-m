// @flow

import Rx from "rxjs"
import { getFormValues } from "redux-form"
import type { EpicDeps } from "../../utils/configureEpics"
import {
    createActionModalDismiss,
} from "../../actions/channels/addChannel"
import {
    createActionChannelsSync,
    createActionRenameChannelPost, createActionRenameChannelPostSuccess,
    RENAME_CHANNEL_POST,
    RENAME_CHANNEL_POST_SUCCESS,
    RENAME_CHANNEL_SUBMIT,
} from "../../actions/channels/channels"
import { getHttpHeaders } from "../../selectors/httpHeaders"
import { updateChannel } from "../../api/httpRequests"
import type { Channel, ChannelDTO } from "../../types"
import { channelDTOToChannel, channelToChannelDTO } from "../../modelTransform/channel"
import { toAssoc } from "../../utils/collections"
import { getActiveChannel } from "../../selectors/activeChannelSelectors"
import { renameChannel } from "../../utils/entityFunctions"


export const submit = (action$: Object, deps: EpicDeps) =>
    action$.ofType(RENAME_CHANNEL_SUBMIT)
        .map(() => {
            const { name } = getFormValues("rename-channel")(deps.getState())
            if (!name) {
                throw new Error("Cannot get name from form")
            }
            const channel: ?Channel = getActiveChannel(deps.getState())
            if (!channel) {
                throw new Error("No active channel!")
            }

            return createActionRenameChannelPost(renameChannel(channel, name))
        })

export const post = (action$: Object, deps: EpicDeps) =>
    action$.ofType(RENAME_CHANNEL_POST)
        .concatMap((action) => {
            const headers = getHttpHeaders(deps.getState())
            const channel: Channel = action.payload.channel
            const channelDTO = channelToChannelDTO(channel)

            return Rx.Observable.from(updateChannel(channelDTO, headers))
        })
        .map((channels: ChannelDTO[]) =>
            createActionRenameChannelPostSuccess(channels))
        .catch((e) => {
            console.log(e)
            return []
        })

export const postSuccessSync = (action$: Object, deps: EpicDeps) =>
    action$.ofType(RENAME_CHANNEL_POST_SUCCESS)
        .map((action) => {
            const channels: ChannelDTO[] = action.payload.channels

            return createActionChannelsSync(toAssoc(
                channels.map((c) => channelDTOToChannel(c)),
                (c: Channel) => c.id,
            ))
        })

export const postSuccessCloseModal = (action$: Object, deps: EpicDeps) =>
    action$.ofType(RENAME_CHANNEL_POST_SUCCESS)
        .map((action) => createActionModalDismiss())


export default [
    submit,
    post,
    postSuccessSync,
    postSuccessCloseModal,
]
