import { getActiveChannel, getActiveChannelId } from "../activeChannelSelectors"
import { getUserChannelsSorted } from "../channels"
import { getActiveChannelState, getAllChannelsObject } from "../index"

jest.mock("../channels")
jest.mock("../index")


describe("getActiveChannelId", () => {
    it("should return state's active channel id", () => {
        getActiveChannelState.mockReturnValue({
            channelId: "channel-id-1",
        })

        return expect(getActiveChannelId()).toEqual("channel-id-1")
    })

    it("should return first channel's active channel id", () => {
        getActiveChannelState.mockReturnValue({
            channelId: null,
        })
        getUserChannelsSorted.mockReturnValue([
            {
                id: "channel-id-1",
                name: "Channel Name",
                creatorEmail: "email@example.com",
                participators: {
                    "email@example.com": {
                        email: "email@example.com",
                        lastReadDate: null,
                    },
                },
            },
            {
                id: "channel-id-2",
                name: "Channel Name 2",
                creatorEmail: "email@example.com",
                participators: {
                    "email@example.com": {
                        email: "email@example.com",
                        lastReadDate: null,
                    },
                },
            },
        ])

        return expect(getActiveChannelId()).toEqual("channel-id-1")
    })
})

describe("getActiveChannel", () => {
    it("should return state's active channel id", () => {
        getActiveChannelState.mockReturnValue({
            channelId: "channel-id-1",
        })

        getAllChannelsObject.mockReturnValue({
            "channel-id-1": {
                id: "channel-id-1",
                name: "Channel Name",
                creatorEmail: "email@example.com",
                participators: {
                    "email@example.com": {
                        email: "email@example.com",
                        lastReadDate: null,
                    },
                },
            },
            "channel-id-2": {
                id: "channel-id-2",
                name: "Channel Name 2",
                creatorEmail: "email@example.com",
                participators: {
                    "email@example.com": {
                        email: "email@example.com",
                        lastReadDate: null,
                    },
                },
            },
        })

        return expect(getActiveChannel()).toEqual({
            id: "channel-id-1",
            name: "Channel Name",
            creatorEmail: "email@example.com",
            participators: {
                "email@example.com": {
                    email: "email@example.com",
                    lastReadDate: null,
                },
            },
        })
    })
})
