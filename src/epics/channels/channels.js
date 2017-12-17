// @flow

import Rx from "rxjs"
import { compareAsc } from "date-fns"
import type { EpicDeps } from "../../utils/configureEpics"
import { CHANNELS_SELECT } from "../../actions/channels/channels"
import { getChannelMessages } from "../../api/httpRequests"
import { getHttpHeaders } from "../../selectors/httpHeaders"
import { createActionChannelMessagesReceived } from "../../actions/messages"
import type { MessageDTO } from "../../types"
import { messageDTOToMessage } from "../../modelTransform/message"


const channelsSelect = (action$: Object, deps: EpicDeps) =>
    action$.ofType(CHANNELS_SELECT)
        .concatMap(({ payload: { channelId } }) =>
            Rx.Observable.from(getChannelMessages(
                channelId,
                getHttpHeaders(deps.getState())))
                .map(messages => [channelId, messages]))
        .map(([channelId, messages]: [string, MessageDTO[]]) => createActionChannelMessagesReceived(
            channelId,
            messages
                .map(m => messageDTOToMessage(m))
                .sort((m1, m2) => compareAsc(m1.created.at, m2.created.at))
        ))
        .catch((e) => {
            console.log(e)
            return []
        })


export default [
    channelsSelect,
]
