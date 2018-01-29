import { getAllChannelsObject } from "../index"
import {
    getUserChannels,
    getUserChannelsSorted,
} from "../channels"
import { getSignedInUserEmail } from "../users"

jest.mock("../index")
jest.mock("../users")


const allChannelsObject = {
    "channel-id-1": {
        id: "channel-id-1",
        name: "B Channel Name",
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
        creatorEmail: "another@example.com",
        participators: {
            "another@example.com": {
                email: "another@example.com",
                lastReadDate: null,
            },
        },
    },
    "channel-id-3": {
        id: "channel-id-3",
        name: "A Channel Name 3",
        creatorEmail: "another@example.com",
        participators: {
            "another@example.com": {
                email: "another@example.com",
                lastReadDate: null,
            },
            "email@example.com": {
                email: "email@example.com",
                lastReadDate: null,
            },
        },
    },
}

describe("getUserChannels", () => {
    it("should return active user's channels", () => {
        getSignedInUserEmail.mockReturnValue("email@example.com")
        getAllChannelsObject.mockReturnValue(allChannelsObject)

        return expect(getUserChannels("message-id-1", undefined)).toEqual([
            {
                id: "channel-id-1",
                name: "B Channel Name",
                creatorEmail: "email@example.com",
                participators: {
                    "email@example.com": {
                        email: "email@example.com",
                        lastReadDate: null,
                    },
                },

            },
            {
                id: "channel-id-3",
                name: "A Channel Name 3",
                creatorEmail: "another@example.com",
                participators: {
                    "another@example.com": {
                        email: "another@example.com",
                        lastReadDate: null,
                    },
                    "email@example.com": {
                        email: "email@example.com",
                        lastReadDate: null,
                    },
                },
            },
        ])
    })
})

describe("getUserChannelsSorted", () => {
    it("should return active user's channels sorted by name", () => {
        getSignedInUserEmail.mockReturnValue("email@example.com")
        getAllChannelsObject.mockReturnValue(allChannelsObject)

        return expect(getUserChannelsSorted("message-id-1", undefined)).toEqual([
            {
                id: "channel-id-3",
                name: "A Channel Name 3",
                creatorEmail: "another@example.com",
                participators: {
                    "another@example.com": {
                        email: "another@example.com",
                        lastReadDate: null,
                    },
                    "email@example.com": {
                        email: "email@example.com",
                        lastReadDate: null,
                    },
                },
            },
            {
                id: "channel-id-1",
                name: "B Channel Name",
                creatorEmail: "email@example.com",
                participators: {
                    "email@example.com": {
                        email: "email@example.com",
                        lastReadDate: null,
                    },
                },

            },
        ])
    })
})
