import { channelIdReducer } from "../channelId"
import { createActionChannelsSelect } from "../../../actions/channels/channels"

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

describe("Unknown action", () => {
    it("should set state correctly", () => {
        const action = { type: "UNKNOWN" }
        const reduced = channelIdReducer(undefined, action)

        return expect(reduced).toEqual(defaultState)
    })
})
