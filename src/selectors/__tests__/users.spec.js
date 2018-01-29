import * as F from "../../test/fixtures"
import { getSignedInUserEmail, getSignedUser } from "../users"
import { getAuth } from "../auth"
import { getUsersStateObject } from "../index"

jest.mock("../index")
jest.mock("../auth")


describe("getSignedInUserEmail", () => {
    it("should return signed user email", () => {
        getAuth.mockReturnValue(F.authFixture)

        return expect(getSignedInUserEmail()).toEqual(F.authFixture.email)
    })
})

describe("getSignedUser", () => {
    it("should return signed user", () => {
        getAuth.mockReturnValue({ ...F.authFixture, email: "email@example.com" })

        getUsersStateObject.mockReturnValue({
            "email@example.com": {
                email: "email@example.com",
                name: "John Doe",
                image: "base 64 encoded image",
            },
            "another@example.com": {
                email: "another@example.com",
                name: "Another User",
                image: null,
            },
        })

        return expect(getSignedUser()).toEqual({
            email: "email@example.com",
            name: "John Doe",
            image: "base 64 encoded image",
        })
    })
})
