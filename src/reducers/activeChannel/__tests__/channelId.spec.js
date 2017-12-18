import { channelIdReducer } from "../channelId"
import { createActionChannelsSelect } from "../../../actions/channels/channels"


describe("Default State", () => {
    it("should have correct initial state", () => {
        return expect(channelIdReducer(undefined, { type: undefined })).toEqual(null)
    })
})

describe("Action Reduce", () => {
    it("should reduce correctly with CHANNELS_SELECT", () => {
        const channelId = "16a04df5-e087-4f8f-b74c-037f99357054"
        const action = createActionChannelsSelect(channelId)
        const result = channelIdReducer(undefined, action)

        return expect(result).toEqual(channelId)
    })
})
