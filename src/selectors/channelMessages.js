// @flow

import { createSelector } from "reselect"
import { find } from "ramda"
import { getActiveChannelId, getSearchText } from "./activeChannelx"
import type { StateObject } from "../reducers/app"
import type { ChannelMessagesStateObject } from "../reducers/channelMessages"
import type { Message } from "../types"
import { fromAssocTuples } from "../utils/collections"


export const getChannelMessagesState = (state: StateObject): ChannelMessagesStateObject => state.channelMessages

export const getChannelMessageById = (id: string, state: StateObject): ?[string, Message] =>
    fromAssocTuples(getChannelMessagesState(state))
        .reduce(
            (acc, [channelId, messages]: [string, Message[]]) => {
                const message = find(
                    (message: Message) => message.id === id,
                    messages,
                )
                return message ? [channelId, message] : acc
            },
            null,
        )

export const getChannelMessagesSorted = (channelId: string, state: StateObject): ?(Message[]) =>
    getChannelMessagesState(state)[channelId]

export const getActiveChannelMessagesSorted = (state: StateObject): ?(Message[]) =>
    // let
    ((activeChannelId: ?string = getActiveChannelId(state)) =>
        // in
        (activeChannelId
            ? getChannelMessagesSorted(activeChannelId, state)
            : null)
    )()

export const getActiveChannelMessagesSortedFiltered: (StateObject) => ?(Message[]) = createSelector(
    getSearchText,
    getActiveChannelMessagesSorted,
    (searchText: string, sorted: ?(Message[])) =>
        (searchText.length > 0
            ? sorted && sorted.filter(m =>
                m.value.toLowerCase().includes(searchText.toLowerCase()))
            : sorted),
)
