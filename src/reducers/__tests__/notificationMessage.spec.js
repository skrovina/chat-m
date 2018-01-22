import { notificationMessageReducer } from "../notificationMessage"
import { createActionShowNotification } from "../../actions/notificationDisplay"


const defaultState = null

describe("Default State", () => {
    it("should have correct initial state", () => {
        return expect(notificationMessageReducer(undefined, { type: undefined })).toEqual(defaultState)
    })
})

describe("SHOW_NOTIFICATION", () => {
    it("should set state correctly", () => {
        const notification = { type: "warning", content: "You are being warned!" }
        const action = createActionShowNotification(notification)
        const reduced = notificationMessageReducer(undefined, action)

        return expect(reduced).toEqual(notification)
    })
})

describe("Unknown action", () => {
    it("should set state correctly", () => {
        const action = { type: "UNKNOWN" }
        const reduced = notificationMessageReducer(undefined, action)

        return expect(reduced).toEqual(defaultState)
    })
})
