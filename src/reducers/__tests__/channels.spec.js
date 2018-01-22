import { channelsReducer } from "../channels"
import { createActionChannelsSync } from "../../actions/channels/channels"


const defaultState = {}

const channelsAssoc = {
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
        name: "Channel Name 2 - I was invited to",
        creatorEmail: "another@example.com",
        participators: {
            "another@example.com": {
                email: "email@example.com",
                lastReadDate: null,
            },
            "email@example.com": {
                email: "email@example.com",
                lastReadDate: null,
            },
        },
    },
    "channel-id-3": {
        id: "channel-id-2",
        name: "Channel Name 3 - I am not invited to",
        creatorEmail: "another@example.com",
        participators: {
            "another@example.com": {
                email: "email@example.com",
                lastReadDate: null,
            },
        },
    },
}

describe("Default State", () => {
    it("should have correct initial state", () => {
        return expect(channelsReducer(undefined, { type: undefined })).toEqual(defaultState)
    })
})

describe("CHANNELS_SYNC", () => {
    it("should set state correctly", () => {
        const action = createActionChannelsSync(channelsAssoc)
        const reduced = channelsReducer(undefined, action)

        return expect(reduced).toEqual(channelsAssoc)
    })
})

describe("Unknown action", () => {
    it("should set state correctly", () => {
        const action = { type: "UNKNOWN" }
        const reduced = channelsReducer(undefined, action)

        return expect(reduced).toEqual(defaultState)
    })
})
