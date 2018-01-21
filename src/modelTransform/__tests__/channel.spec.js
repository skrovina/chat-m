import {
    channelDTOToChannel,
    channelToChannelDTO,
    newChannelDTOToNewChannel,
    newChannelToNewChannelDTO,
} from "../channel"
import {
    channel,
    channelDTO,
    newChannel,
    newChannelDTO,
} from "../../test/fixtures"


describe("newChannelToNewChannelDTO", () => {
    it("should convert correctly", () => {
        expect(newChannelToNewChannelDTO(newChannel)).toEqual(newChannelDTO)
    })
})

describe("newChannelDTOToNewChannel", () => {
    it("should convert correctly", () => {
        expect(newChannelDTOToNewChannel(newChannelDTO)).toEqual(newChannel)
    })
})

describe("channelToChannelDTO", () => {
    it("should convert correctly", () => {
        expect(channelToChannelDTO(channel)).toEqual(channelDTO)
    })
})

describe("channelDTOToChannel", () => {
    it("should convert correctly", () => {
        expect(channelDTOToChannel(channelDTO)).toEqual(channel)
    })
})
