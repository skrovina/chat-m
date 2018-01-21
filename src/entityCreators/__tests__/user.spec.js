import { createUser } from "../user"


describe("createUser", () => {
    it("should create user correctly", () => {
        const createdUser = createUser("email@example.com", "John Doe", "base 64 encoded image")
        const literalUser = {
            email: "email@example.com",
            name: "John Doe",
            image: "base 64 encoded image",
        }

        expect(createdUser).toEqual(literalUser)
    })
    it("should create user without image correctly", () => {
        const createdUser = createUser("email@example.com", "John Doe")
        const literalUser = {
            email: "email@example.com",
            name: "John Doe",
            image: null,
        }

        expect(createdUser).toEqual(literalUser)
    })
})
