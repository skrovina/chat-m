import { channelIdReducer } from "../channelId"
import {
    createActionChannelsSelect, createActionDeleteChannelPostSuccess,
    DELETE_CHANNEL_POST_SUCCESS,
} from "../../../actions/channels/channels"
import { createActionLogOut } from "../../../actions/logout"

const defaultState = null

describe("Default State", () => {
    it("should have correct initial state", () => {
        return expect(channelIdReducer(undefined, { type: undefined })).toEqual(defaultState)
    })
})

describe("CHANNELS_SELECT", () => {
    it("should set state correctly", () => {
        const channelId = "16a04df5-e087-4f8f-b74c-037f99357054"
        const action = createActionChannelsSelect(channelId)
        const reduced = channelIdReducer(undefined, action)

        return expect(reduced).toEqual(channelId)
    })
})

describe("LOGOUT", () => {
    it("should set state correctly", () => {
        const channelId = "16a04df5-e087-4f8f-b74c-037f99357054"
        const action = createActionLogOut()
        const reduced = channelIdReducer(channelId, action)

        return expect(reduced).toEqual(null)
    })
})

describe("DELETE_CHANNEL_POST_SUCCESS", () => {
    it("should reset active channel if channel is deleted", () => {
        const channelId = "16a04df5-e087-4f8f-b74c-037f99357054"
        const action = createActionDeleteChannelPostSuccess({}, channelId)
        const reduced = channelIdReducer(channelId, action)

        return expect(reduced).toEqual(null)
    })
    it("should not reset active channel if inactive channel is deleted", () => {
        const channelId = "16a04df5-e087-4f8f-b74c-037f99357054"
        const action = createActionDeleteChannelPostSuccess({}, "channel-id-1")
        const reduced = channelIdReducer(channelId, action)

        return expect(reduced).toEqual(channelId)
    })
})

describe("Unknown action", () => {
    it("should set state correctly", () => {
        const action = { type: "UNKNOWN" }
        const reduced = channelIdReducer(undefined, action)

        return expect(reduced).toEqual(defaultState)
    })
})
