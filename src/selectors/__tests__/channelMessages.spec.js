import * as F from "../../test/fixtures"
import { getActiveChannelId, getSearchText } from "../activeChannelSelectors"
import { getChannelMessagesState } from "../index"
import {
    getActiveChannelMessagesSorted, getActiveChannelMessagesSortedFiltered,
    getChannelMessageById,
} from "../channelMessages"

jest.mock("../channels")
jest.mock("../index")
jest.mock("../activeChannelSelectors")


describe("getChannelMessageById", () => {
    it("should return channel id & message by message id", () => {
        getChannelMessagesState.mockReturnValue(F.channelMessagesAssoc)

        return expect(getChannelMessageById("message-id-1", undefined)).toEqual([
            "channel-id-1",
            {
                id: "message-id-1",
                value: "1st message",
                created: {
                    at: "2018-01-21T11:33:51.0210191Z",
                    by: "skrovinam@gmail.com",
                },
                updated: {
                    at: "2018-01-21T11:33:51.0210191Z",
                    by: "skrovinam@gmail.com",
                },
                upvoteCount: 0,
            },
        ])
    })
})

describe("getActiveChannelMessagesSorted", () => {
    it("should return active channel messages ordered by time", () => {
        getActiveChannelId.mockReturnValue("channel-id-1")
        getChannelMessagesState.mockReturnValue(F.channelMessagesAssoc)

        return expect(getActiveChannelMessagesSorted()).toEqual([
            {
                id: "message-id-1",
                value: "1st message",
                created: {
                    at: "2018-01-21T11:33:51.0210191Z",
                    by: "skrovinam@gmail.com",
                },
                updated: {
                    at: "2018-01-21T11:33:51.0210191Z",
                    by: "skrovinam@gmail.com",
                },
                upvoteCount: 0,
            },
            {
                id: "message-id-2",
                value: "Hola",
                created: {
                    at: "2018-01-21T11:37:50.3199429Z",
                    by: "d@d.com",
                },
                updated: {
                    at: "2018-01-21T11:37:50.3199429Z",
                    by: "d@d.com",
                },
                upvoteCount: 5,
            },
        ])
    })
})

describe("getActiveChannelMessagesSortedFiltered", () => {
    it("should return active channel messages filtered by search string", () => {
        getSearchText.mockReturnValue("Hola")
        getActiveChannelId.mockReturnValue("channel-id-1")
        getChannelMessagesState.mockReturnValue(F.channelMessagesAssoc)

        return expect(getActiveChannelMessagesSortedFiltered()).toEqual([{
            id: "message-id-2",
            value: "Hola",
            created: {
                at: "2018-01-21T11:37:50.3199429Z",
                by: "d@d.com",
            },
            updated: {
                at: "2018-01-21T11:37:50.3199429Z",
                by: "d@d.com",
            },
            upvoteCount: 5,
        }])
    })
})
