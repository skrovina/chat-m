import { loadingReducer } from "../loading"
import { createActionLoadingEnded, createActionLoadingStarted } from "../../actions/loading"


const defaultState = false

describe("Default State", () => {
    it("should have correct initial state", () => {
        return expect(loadingReducer(undefined, { type: undefined })).toEqual(defaultState)
    })
})

describe("LOADING_STARTED", () => {
    it("should have correct initial state", () => {
        return expect(loadingReducer(undefined, createActionLoadingStarted())).toEqual(true)
    })
})

describe("LOADING_ENDED", () => {
    it("should have correct initial state", () => {
        return expect(loadingReducer(undefined, createActionLoadingEnded())).toEqual(false)
    })
})

describe("Unknown action", () => {
    it("should set state correctly", () => {
        const action = { type: "UNKNOWN" }
        const reduced = loadingReducer(undefined, action)

        return expect(reduced).toEqual(defaultState)
    })
})
