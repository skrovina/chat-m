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
import { createActionChannelsSync } from "../actions/channels/channels"
import { channelDTOToChannel } from "../modelTransform/channel"
import { APP_LOADED } from "../actions/app"
import { createActionLogOut } from "../actions/logout"


const syncStart = (action$: Object, deps: EpicDeps) =>
    action$.ofType(APP_LOADED)
    // .switchMap(() => Rx.Observable.interval(5000))
        .map(() => createActionSyncStart())

const syncFire = (action$: Object, deps: EpicDeps) =>
    action$.ofType(SYNC_START)
        // .switchMap(() => Rx.Observable.interval(5000))
        .map(() => createActionSyncFire())

const syncUsers = (action$: Object, deps: EpicDeps) =>
    action$.ofType(SYNC_FIRE)
        .switchMap(() => {
            const headers = getHttpHeaders(deps.getState())

            return Rx.Observable.from(getAllUsers(headers))
        })
        .map((users: UserDTO[]) =>
            createActionUsersSync(toAssoc(
                users.map((u) => userDTOToUser(u)),
                (u: User) => u.email,
            )))
        .catch((e) => {
            console.log(e)
            return [createActionLogOut()]
        })

const syncChannels = (action$: Object, deps: EpicDeps) =>
    action$.ofType(SYNC_FIRE)
        .switchMap(() => {
            const headers = getHttpHeaders(deps.getState())

            return Rx.Observable.from(getChannels(headers))
        })
        .map((channels: ChannelDTO[]) =>
            createActionChannelsSync(toAssoc(
                channels.map((c) => channelDTOToChannel(c)),
                (c: Channel) => c.id,
            )))
        .catch((e) => {
            console.log(e)
            return [createActionLogOut()]
        })


export default [
    syncStart,
    syncFire,
    syncUsers,
    syncChannels,
]
