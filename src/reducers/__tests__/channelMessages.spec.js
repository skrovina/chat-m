import { channelMessagesReducer } from "../channelMessages"
import {
    createActionEditMessagePostSuccess,
    createActionChannelMessageSentSuccess,
    createActionChannelMessagesReceived,
    createActionDeleteMessagePostSuccess,
} from "../../actions/messages"
import { channelMessagesAssoc, messagesArray } from "../../test/fixtures"


const defaultState = {}

const updatedUser = {
    email: "email@example.com",
    name: "Differenct Name",
    image: "Different Image",
}

describe("Default State", () => {
    it("should have correct initial state", () => {
        return expect(channelMessagesReducer(undefined, { type: undefined })).toEqual(defaultState)
    })
})

describe("CHANNEL_MESSAGES_RECEIVED", () => {
    it("should update with the received messages", () => {
        const action = createActionChannelMessagesReceived("channel-id-1", messagesArray)
        const reduced = channelMessagesReducer(undefined, action)

        return expect(reduced).toEqual({
            "channel-id-1": messagesArray,
        })
    })
})

describe("CHANNEL_MESSAGE_SENT_SUCCESS", () => {
    it("should contain the sent message", () => {
        const message = {
            id: "message-id-100",
            value: "Hola",
            created: {
                at: "2018-01-26T11:37:50.3199429Z",
                by: "d@d.com",
            },
            updated: {
                at: "2018-01-26T11:37:50.3199429Z",
                by: "d@d.com",
            },
            upvoteCount: 0,
        }

        const action = createActionChannelMessageSentSuccess("channel-id-1", message)
        const reduced = channelMessagesReducer(channelMessagesAssoc, action)

        return expect(reduced["channel-id-1"]).toContain(message)
    })
})

describe("EDIT_MESSAGE_POST_SUCCESS", () => {
    const updatedMessage = {
        id: "message-id-1",
        value: "Hola, mi amigo!",
        created: {
            at: "2018-01-26T11:37:50.3199429Z",
            by: "d@d.com",
        },
        updated: {
            at: "2018-01-29T11:37:50.3199429Z",
            by: "d@d.com",
        },
        upvoteCount: 0,
    }
    const originalMessage = channelMessagesAssoc["channel-id-1"].find(m => m.id === "message-id-1")

    const action = createActionEditMessagePostSuccess("channel-id-1", updatedMessage)
    const reduced = channelMessagesReducer(channelMessagesAssoc, action)

    it("should contain the edited message", () => {
        expect(reduced["channel-id-1"]).toContain(updatedMessage)
    })
    it("should not contain the original message", () => {
        expect(reduced["channel-id-1"]).not.toContain(originalMessage)
    })
    it("should contain other channel message", () => {
        expect(reduced["channel-id-1"].filter(m => m.id !== "message-id-1")).not.toHaveLength(0)
    })
    it("should contain other channels", () => {
        expect(Object.values(reduced).length).toBeGreaterThan(1)
    })
})

describe("MESSAGE_ADJUST_VOTES_SUCCESS", () => {
    const updatedMessage = {
        id: "message-id-1",
        value: "Hola",
        created: {
            at: "2018-01-26T11:37:50.3199429Z",
            by: "d@d.com",
        },
        updated: {
            at: "2018-01-29T11:37:50.3199429Z",
            by: "d@d.com",
        },
        upvoteCount: 5,
    }
    const originalMessage = channelMessagesAssoc["channel-id-1"].find(m => m.id === "message-id-1")

    const action = createActionEditMessagePostSuccess("channel-id-1", updatedMessage)
    const reduced = channelMessagesReducer(channelMessagesAssoc, action)

    it("should contain the edited message", () => {
        expect(reduced["channel-id-1"]).toContain(updatedMessage)
    })
    it("should not contain the original message", () => {
        expect(reduced["channel-id-1"]).not.toContain(originalMessage)
    })
    it("should contain other channel message", () => {
        expect(reduced["channel-id-1"].filter(m => m.id !== "message-id-1")).not.toHaveLength(0)
    })
    it("should contain other channels", () => {
        expect(Object.values(reduced).length).toBeGreaterThan(1)
    })
})

describe("DELETE_MESSAGE_POST_SUCCESS", () => {
    it("should not contain the deleted message", () => {
        const action = createActionDeleteMessagePostSuccess("channel-id-1", "message-id-1")
        const reduced = channelMessagesReducer(channelMessagesAssoc, action)

        return expect(reduced["channel-id-1"].find(m => m.id === "message-id-1")).toBe(undefined)
    })
})

describe("Unknown action", () => {
    it("should set state correctly", () => {
        const action = { type: "UNKNOWN" }
        const reduced = channelMessagesReducer(undefined, action)

        return expect(reduced).toEqual(defaultState)
    })
})
