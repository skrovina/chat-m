import { createActionMessageSearchTextChanged } from "../../../actions/messages"
import { messageSearchReducer } from "../messageSearch"
import { newMessageTextReducer } from "../newMessageText"
import { channelIdReducer } from "../channelId"
import { activeChannelReducer } from "../index"

const defaultState = {
    channelId: channelIdReducer(undefined, { type: undefined }),
    newMessageText: newMessageTextReducer(undefined, { type: undefined }),
    messageSearchText: messageSearchReducer(undefined, { type: undefined }),
}

describe("Default State", () => {
    it("should have correct initial state", () => {
        return expect(activeChannelReducer(undefined, { type: undefined })).toEqual(defaultState)
    })
})

describe("MESSAGE_SEARCH_TEXT_CHANGED delegation", () => {
    it("should set state correctly", () => {
        const text = "Hello, it's me you're looking for!"
        const action = createActionMessageSearchTextChanged(text)
        const reduced = activeChannelReducer(undefined, action)

        return expect(reduced.messageSearchText).toEqual(text)
    })
})
