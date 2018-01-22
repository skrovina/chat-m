import {
    createActionMessageComposeSent,
    createActionMessageComposeTextChanged,
} from "../../../actions/messages"
import { newMessageTextReducer } from "../newMessageText"

const defaultState = ""
const nonEmptyState = "Hello, it's me you're looking for!"


describe("Default State", () => {
    it("should have correct initial state", () => {
        return expect(newMessageTextReducer(undefined, { type: undefined })).toEqual(defaultState)
    })
})

describe("MESSAGE_COMPOSE_TEXT_CHANGED", () => {
    it("should set state correctly", () => {
        const text = "Hello, it's me you're looking for!"
        const action = createActionMessageComposeTextChanged(text)
        const reduced = newMessageTextReducer(undefined, action)

        return expect(reduced).toEqual(text)
    })
})

describe("MESSAGE_COMPOSE_SENT", () => {
    it("should set state correctly", () => {
        const action = createActionMessageComposeSent()
        const reduced = newMessageTextReducer(nonEmptyState, action)

        return expect(reduced).toEqual("")
    })
})

describe("Unknown action", () => {
    it("should set state correctly", () => {
        const action = { type: "UNKNOWN" }
        const reduced = newMessageTextReducer(nonEmptyState, action)

        return expect(reduced).toEqual(nonEmptyState)
    })
})
