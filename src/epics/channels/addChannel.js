// @flow

import Rx from "rxjs"
import { getFormValues } from "redux-form"
import type { EpicDeps } from "../../utils/configureEpics"
import {
    ADD_CHANNEL_POST, ADD_CHANNEL_POST_SUCCESS, ADD_CHANNEL_SUBMIT, createActionModalDismiss,
    createActionAddChannelPost, createActionAddChannelPostFailure, createActionAddChannelPostSuccess,
} from "../../actions/channels/addChannel"
import { createActionChannelsSync } from "../../actions/channels/channels"
import { createNewChannel } from "../../entityCreators/channel"
import { getHttpHeaders } from "../../selectors/httpHeaders"
import { getSignedInUserEmail } from "../../selectors/users"
import { addChannel } from "../../api/httpRequests"
import type { Channel, ChannelDTO, NewChannel } from "../../types"
import { channelDTOToChannel, newChannelToNewChannelDTO } from "../../modelTransform/channel"
import { toAssoc } from "../../utils/collections"


export const submit = (action$: Object, deps: EpicDeps) =>
    action$.ofType(ADD_CHANNEL_SUBMIT)
        .map(() => {
            const { name } = getFormValues("add-channel")(deps.getState())
            if (!name) {
                throw new Error("Cannot get name from form")
            }
            const email = getSignedInUserEmail(deps.getState())
            if (!email) {
                throw new Error("No user is signed in!")
            }

            return createActionAddChannelPost(createNewChannel(name, email))
        })

export const post = (action$: Object, deps: EpicDeps) =>
    action$.ofType(ADD_CHANNEL_POST)
        .concatMap((action) => {
            const headers = getHttpHeaders(deps.getState())
            const newChannel: NewChannel = action.payload.newChannel
            const newChannelDTO = newChannelToNewChannelDTO(newChannel)

            return Rx.Observable.from(addChannel(newChannelDTO, headers))
        })
        .map((channels: ChannelDTO[]) =>
            createActionAddChannelPostSuccess(channels))
        .catch((e) => {
            console.log(e)
            return createActionAddChannelPostFailure(e)
        })

export const postSuccessSync = (action$: Object, deps: EpicDeps) =>
    action$.ofType(ADD_CHANNEL_POST_SUCCESS)
        .map((action) => {
            const channels: ChannelDTO[] = action.payload.channels

            return createActionChannelsSync(toAssoc(
                channels.map((c) => channelDTOToChannel(c)),
                (c: Channel) => c.id,
            ))
        })

export const postSuccessCloseModal = (action$: Object, deps: EpicDeps) =>
    action$.ofType(ADD_CHANNEL_POST_SUCCESS)
        .mapTo(createActionModalDismiss())


export default [
    submit,
    post,
    postSuccessSync,
    postSuccessCloseModal,
]
