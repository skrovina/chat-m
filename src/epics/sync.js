// @flow

import Rx from "rxjs"
import type { EpicDeps } from "../utils/configureEpics"
import { getAllUsers, getChannels } from "../api/httpRequests"
import { getHttpHeaders } from "../selectors/httpHeaders"
import { SYNC_START, SYNC_FIRE, createActionSyncFire, createActionSyncStart } from "../actions/sync"
import type { Channel, ChannelDTO, User, UserDTO } from "../types"
import { createActionUsersSync } from "../actions/users"
import { userDTOToUser } from "../modelTransform/user"
import { toAssoc } from "../utils/collections"
import { CHANNELS_SYNC, createActionChannelsSync } from "../actions/channels/channels"
import { channelDTOToChannel } from "../modelTransform/channel"
import { APP_LOADED } from "../actions/app"
import { createActionLogOut } from "../actions/logout"
import { getUserChannels } from "../selectors/channels"
import { createActionChannelMessagesSync } from "../actions/messages"

const sycPeriod = 10000

export const syncStart = (action$: Object, deps: EpicDeps) =>
    action$.ofType(APP_LOADED)
        .map(() => createActionSyncStart())

export const syncFire = (period: number = sycPeriod, scheduler: Rx.Scheduler = null) =>
    (action$: Object, deps: EpicDeps) =>
        action$.ofType(SYNC_START)
        // Synchronize every 10 seconds
            .switchMap(() => Rx.Observable.timer(0, period, scheduler))
            .map(() => createActionSyncFire())

export const syncUsers = (action$: Object, deps: EpicDeps) =>
    action$.ofType(SYNC_FIRE)
        .concatMap(() => {
            const headers = getHttpHeaders(deps.getState())

            return Rx.Observable.from(getAllUsers(headers))
                .map((users: UserDTO[]) =>
                    createActionUsersSync(toAssoc(
                        users.map((u) => userDTOToUser(u)),
                        (u: User) => u.email,
                    )))
                .catch((e) => {
                    console.log(e)
                    return e.status === 403 || e.status === 401
                        ? [createActionLogOut()]
                        : []
                })
        })

export const syncChannels = (action$: Object, deps: EpicDeps) =>
    action$.ofType(SYNC_FIRE)
        .concatMap(() => {
            const headers = getHttpHeaders(deps.getState())

            return Rx.Observable.from(getChannels(headers))
                .map((channels: ChannelDTO[]) =>
                    createActionChannelsSync(toAssoc(
                        channels.map((c) => channelDTOToChannel(c)),
                        (c: Channel) => c.id,
                    )))
                .catch((e) => {
                    console.log(e)
                    return e.status === 403 || e.status === 401
                        ? [createActionLogOut()]
                        : []
                })
        })

export const syncMessages = (action$: Object, deps: EpicDeps) =>
    action$.ofType(CHANNELS_SYNC)
        .concatMap(() => {
            const channels: Channel[] = getUserChannels(deps.getState())

            return channels.map(channel => createActionChannelMessagesSync(channel.id))
        })

export default [
    syncStart,
    syncFire(),
    syncUsers,
    syncChannels,
    syncMessages,
]
