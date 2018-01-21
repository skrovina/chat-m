import { createNewChannel } from "../../entityCreators/channel"
import { addParticipatorToChannel, renameChannel, updateMessageValue, updateUserProfile } from "../entityFunctions"
import { createUser } from "../../entityCreators/user"
import { createMessage } from "../../entityCreators/message"

describe("renameChannel", () => {
    it("should rename channel", () => {
        const channel = createNewChannel("Channel Name", "email@example.com")

        const renamed = renameChannel(channel, "Renamed Channel Name")

        const expected = createNewChannel("Renamed Channel Name", "email@example.com")


        expect(renamed).toEqual(expected)
    })
})

describe("addParticipatorToChannel", () => {
    const channel = createNewChannel("Channel Name", "email@example.com")
    const channelWithParticipator = addParticipatorToChannel(channel, "participator@example.com")

    it("should contain added participator", () => {
        expect(channelWithParticipator.participators["participator@example.com"]).toEqual({
            email: "participator@example.com",
            lastReadDate: null,
        })
    })
    it("should contain original participator", () => {
        expect(channelWithParticipator.participators["email@example.com"]).toEqual({
            email: "email@example.com",
            lastReadDate: null,
        })
    })
})

describe("updateUserProfile", () => {
    const user = createUser("email@example.com", "John Doe")

    it("should update user name", () => {
        const nameUpdatedUser = updateUserProfile(user, "Joanna Dough", null)
        expect(nameUpdatedUser.name).toEqual("Joanna Dough")
    })
    it("should update user image", () => {
        const imageUpdatedUser = updateUserProfile(user, null, "base64 string")
        expect(imageUpdatedUser.name).toEqual("John Doe")
        expect(imageUpdatedUser.image).toEqual("base64 string")
    })
})

describe("updateMessageValue", () => {
    const message = createMessage("Message Body", "email@example.com")

    const updatedValueMessage = updateMessageValue(message, "Updated Body")

    it("should update the value", () => {
        expect(updatedValueMessage.value).toEqual("Updated Body")
    })
})
