import { createActionUsersSync, createActionUserUpdate } from "../../actions/users"
import { usersReducer } from "../users"


const defaultState = {}

const usersAssoc = {
    "email@example.com": {
        email: "email@example.com",
        name: "User WithAName",
        image: "User WithAnImage Base64 encoded",
    },
    "email2@example.com": {
        email: "email2@example.com",
        name: "Another User WithAName THough no Image",
        image: null,
    },
    "incognito@example.com": {
        email: "incognito@example.com",
        name: null,
        image: null,
    },
}

const updatedUser = {
    email: "email@example.com",
    name: "Differenct Name",
    image: "Different Image",
}

describe("Default State", () => {
    it("should have correct initial state", () => {
        return expect(usersReducer(undefined, { type: undefined })).toEqual(defaultState)
    })
})

describe("USERS_SYNC", () => {
    it("should set state correctly", () => {
        const action = createActionUsersSync(usersAssoc)
        const reduced = usersReducer(undefined, action)

        return expect(reduced).toEqual(usersAssoc)
    })
})

describe("USER_UPDATE", () => {
    it("should set state correctly", () => {
        const action = createActionUserUpdate(updatedUser)
        const reduced = usersReducer(usersAssoc, action)

        return expect(reduced[updatedUser.email]).toEqual(updatedUser)
    })
})

describe("Unknown action", () => {
    it("should set state correctly", () => {
        const action = { type: "UNKNOWN" }
        const reduced = usersReducer(undefined, action)

        return expect(reduced).toEqual(defaultState)
    })
})
