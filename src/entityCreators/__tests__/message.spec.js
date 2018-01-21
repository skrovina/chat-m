import { createMessage } from "../message"
import { getIsoDate } from "../../utils/clock"
import { uuid } from "../../utils/uuidGenerator"
import { idFixture, isoDateFixture } from "../../test/fixtures"

jest.mock("../../utils/uuidGenerator")
jest.mock("../../utils/clock")

uuid.mockImplementation(() => idFixture)
getIsoDate.mockImplementation(() => isoDateFixture)


describe("createMessage", () => {
    it("should create message correctly", () => {
        const createdMessage = createMessage("Message Body", "email@example.com")
        const literalMessage = {
            id: idFixture,
            value: "Message Body",
            created: {
                at: isoDateFixture,
                by: "email@example.com",
            },
            updated: null,
            upvoteCount: 0,
        }

        expect(createdMessage).toEqual(literalMessage)
    })
})
