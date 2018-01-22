import { authReducer } from "../auth"
import { createActionLoginAuthorized } from "../../actions/login"
import { createActionLogOut } from "../../actions/logout"


const defaultState = null
const auth = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJqdGki" +
    "OiI1OTEzNDk1OS1hNWQ2LTQ0YmYtODAzZC1kZGM5ZjQzNzAyNzkiLCJpYXQiOjE1MTM0NzY2OTMsIm5iZiI6" +
    "MTUxMzQ3NjY5MywiZXhwIjoxNTEzNTYzMDkzLCJpc3MiOiJQVjI0NyBBUEkiLCJhdWQiOiJQVjI0NyBTdHVk" +
    "ZW50cyJ9.9opR2h7qJZ9Q7CCWOp2w9KaA52Q44dqMrYXGFqUwbfY",
    email: "email@example.com",
}

describe("Default State", () => {
    it("should have correct initial state", () => {
        return expect(authReducer(undefined, { type: undefined })).toEqual(defaultState)
    })
})

describe("LOGIN_AUTHORIZED", () => {
    it("should set state correctly", () => {
        const action = createActionLoginAuthorized(auth)
        const reduced = authReducer(undefined, action)

        return expect(reduced).toEqual(auth)
    })
})

describe("LOGOUT", () => {
    it("should set state correctly", () => {
        const action = createActionLogOut()
        const reduced = authReducer(auth, action)

        return expect(reduced).toEqual(null)
    })
})

describe("Unknown action", () => {
    it("should set state correctly", () => {
        const action = { type: "UNKNOWN" }
        const reduced = authReducer(undefined, action)

        return expect(reduced).toEqual(defaultState)
    })
})
