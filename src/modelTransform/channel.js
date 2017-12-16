// @flow

import type { Channel, ChannelDTO, NewChannel, NewChannelDTO } from "../types"
import { decodeCustomData, encodeCustomData } from "./coder"

export const channelToChannelDTO = ({ id, name, ...rest }: Channel): ChannelDTO => ({
    id: id,
    name: name,
    customData: encodeCustomData(rest),
})

export const channelDTOToChannel = ({ id, name, customData }: ChannelDTO): Channel =>
    // let
    (({ creatorEmail = "", participators = {} } = decodeCustomData(customData)) =>
        // in
        ({
            id: id,
            name: name,
            creatorEmail: creatorEmail,
            participators: participators,
        })
    )()

export const newChannelToNewChannelDTO = ({ name, ...rest }: NewChannel): NewChannelDTO => ({
    name: name,
    customData: encodeCustomData(rest),
})

export const newChannelDTOToNewChannel = ({ name, customData }: NewChannelDTO): NewChannel =>
    // let
    (({ creatorEmail = "", participators = {} } = decodeCustomData(customData)) =>
        // in
        ({
            name: name,
            creatorEmail: creatorEmail,
            participators: participators,
        })
    )()
