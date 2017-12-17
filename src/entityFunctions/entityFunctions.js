// @flow

import { assoc } from "ramda"
import type { Channel, Message, User } from "../types"

export const renameChannel = (channel: Channel, name: string): Channel =>
    // $FlowFixMe
    ({ ...channel, name: name })

export const addParticipatorToChannel = (channel: Channel, email: string): Channel =>
    // $FlowFixMe
    ({
        ...channel,
        participators: assoc(
            email,
            {
                email: email,
                lastReadDate: null,
            },
            channel.participators,
        ),
    })

export const updateUserProfile = (user: User, name: ?string, image: ?string) => ({
    ...user,
    ...(name ? { name: name } : {}),
    ...(image ? { image: image } : {}),
})

export const adjustMessageVotes = (message: Message, addVotes: number): Message =>
    // $FlowFixMe
    ({
        ...message,
        upvoteCount: message.upvoteCount + addVotes,
    })

export const updateMessageValue = (message: Message, value: string): Message =>
    // $FlowFixMe
    ({
        ...message,
        value: value,
    })
