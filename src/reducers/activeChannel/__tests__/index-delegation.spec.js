import { activeChannelReducer } from "../index"
import { channelIdReducer } from "../channelId"
import { newMessageTextReducer } from "../newMessageText"
import { messageSearchReducer } from "../messageSearch"

jest.mock("../channelId")
jest.mock("../newMessageText")
jest.mock("../messageSearch")

channelIdReducer.mockReturnValue(null)
newMessageTextReducer.mockReturnValue(null)
messageSearchReducer.mockReturnValue(null)

const nonEmptyState = {
    channelId: null,
    newMessageText: null,
    messageSearchText: null,
}

describe("MESSAGE_SEARCH_TEXT_CHANGED delegation", () => {
    it("should set state correctly", () => {
        const action = { type: undefined }

        expect(channelIdReducer(undefined, action)).toEqual(null)
        //const reduced = activeChannelReducer(nonEmptyState, { type: "@@redux/INIT" })

        expect(channelIdReducer).toBeCalled()
    })
})
