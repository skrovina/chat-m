import { createNewChannel } from "../channel"


describe("createNewChannel", () => {
    it("should create a new channel object correctly", () => {
        const createdNewChannel = createNewChannel("Channel Name", "email@example.com")

        const literalNewChannel = {
            name: "Channel Name",
            creatorEmail: "email@example.com",
            participators: {
                "email@example.com": {
                    email: "email@example.com",
                    lastReadDate: null,
                },
            },
        }

        expect(createdNewChannel).toEqual(literalNewChannel)
    })
})
