import { messageDTOToMessage, messageToMessageDTO } from "../message"
import { message, messageDTO } from "../../test/fixtures"


describe("messageToMessageDTO", () => {
    it("should convert correctly", () => {
        expect(messageToMessageDTO(message)).toEqual(messageDTO)
    })
})

describe("messageDTOToMessage", () => {
    it("should convert correctly", () => {
        expect(messageDTOToMessage(messageDTO)).toEqual(message)
    })
})
