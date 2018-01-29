// @flow

import Rx from "rxjs"
import { getFormValues } from "redux-form"
import type { EpicDeps } from "../../utils/configureEpics"
import {
    createActionModalDismiss,
} from "../../actions/channels/addChannel"
import {
    createActionChannelsSync, createActionInviteChannelPost, createActionInviteChannelPostSuccess,
    INVITE_CHANNEL_POST, INVITE_CHANNEL_POST_SUCCESS, INVITE_CHANNEL_SUBMIT,
} from "../../actions/channels/channels"
import { getHttpHeaders } from "../../selectors/httpHeaders"
import { updateChannel } from "../../api/httpRequests"
import type { Channel, ChannelDTO } from "../../types"
import { channelDTOToChannel, channelToChannelDTO } from "../../modelTransform/channel"
import { toAssoc } from "../../utils/collections"
import { getActiveChannel } from "../../selectors/activeChannelSelectors"
import { addParticipatorToChannel } from "../../utils/entityFunctions"
import { createActionShowError } from "../../actions/notificationDisplay"


export const submit = (action$: Object, deps: EpicDeps) =>
    action$.ofType(INVITE_CHANNEL_SUBMIT)
        .map(() => {
            const { email } = getFormValues("invite-channel")(deps.getState())
            if (!email) {
                throw new Error("Cannot get email from form")
            }
            const channel: ?Channel = getActiveChannel(deps.getState())
            if (!channel) {
                throw new Error("No active channel!")
            }

            return createActionInviteChannelPost(addParticipatorToChannel(channel, email))
        })

export const post = (action$: Object, deps: EpicDeps) =>
    action$.ofType(INVITE_CHANNEL_POST)
        .concatMap((action) => {
            const headers = getHttpHeaders(deps.getState())
            const channel: Channel = action.payload.channel
            const channelDTO = channelToChannelDTO(channel)

            return Rx.Observable.from(updateChannel(channelDTO, headers))
                .map((channels: ChannelDTO[]) =>
                    createActionInviteChannelPostSuccess(channels))
                .catch((e) => {
                    console.log(e)
                    return [createActionShowError("Inviting to channel failed")]
                })
        })

export const postSuccessSync = (action$: Object, deps: EpicDeps) =>
    action$.ofType(INVITE_CHANNEL_POST_SUCCESS)
        .map((action) => {
            const channels: ChannelDTO[] = action.payload.channels

            return createActionChannelsSync(toAssoc(
                channels.map((c) => channelDTOToChannel(c)),
                (c: Channel) => c.id,
            ))
        })

export const postSuccessCloseModal = (action$: Object, deps: EpicDeps) =>
    action$.ofType(INVITE_CHANNEL_POST_SUCCESS)
        .mapTo(createActionModalDismiss())


export default [
    submit,
    post,
    postSuccessSync,
    postSuccessCloseModal,
]
