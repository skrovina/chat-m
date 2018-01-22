import { createActionMessageSearchTextChanged } from "../../../actions/messages"
import { messageSearchReducer } from "../messageSearch"

const defaultState = ""

describe("Default State", () => {
    it("should have correct initial state", () => {
        return expect(messageSearchReducer(undefined, { type: undefined })).toEqual(defaultState)
    })
})

describe("MESSAGE_SEARCH_TEXT_CHANGED", () => {
    it("should set state correctly", () => {
        const text = "Hello, it's me you're looking for!"
        const action = createActionMessageSearchTextChanged(text)
        const reduced = messageSearchReducer(undefined, action)

        return expect(reduced).toEqual(text)
    })
})

describe("Unknown action", () => {
    it("should set state correctly", () => {
        const action = { type: "UNKNOWN" }
        const reduced = messageSearchReducer(undefined, action)

        return expect(reduced).toEqual(defaultState)
    })
})
