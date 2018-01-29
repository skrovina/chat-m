import { createNewChannel } from "../entityCreators/channel"
import { uuid } from "../utils/uuidGenerator"
import { getIsoDate } from "../utils/clock"
import { createUser } from "../entityCreators/user"

jest.mock("../utils/uuidGenerator")
jest.mock("../utils/clock")

export const idFixture = "totaly-not-random-id-1"
export const isoDateFixture = "2018-01-21T15:54:34.522Z"

uuid.mockImplementation(() => idFixture)
getIsoDate.mockImplementation(() => isoDateFixture)


export const emailFixture = "email@example.com"

export const nameFixture = "John Doe"

export const newChannel = createNewChannel("Channel Name", "email@example.com")

export const newChannelDTO = {
    customData: "{\"creatorEmail\":\"email@example.com\",\"participators\":{\"email@e" +
    "xample.com\":{\"email\":\"email@example.com\",\"lastReadDate\":null}}}",
    name: "Channel Name",
}

export const channel = { ...newChannel, id: "channel-id-1" }

export const channelDTO = {
    customData: "{\"creatorEmail\":\"email@example.com\",\"participators\":{\"email@e" +
    "xample.com\":{\"email\":\"email@example.com\",\"lastReadDate\":null}}}",
    id: "channel-id-1",
    name: "Channel Name",
}

export const messageBodyFixture = "Message Body"

export const messagesArray = [
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
]

export const channelMessagesAssoc = {
    "channel-id-1": [
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
    ],
    "channel-id-2": [
        {
            id: "message-id-3",
            value: "Hello",
            created: {
                at: "2018-01-21T11:26:31.9366796Z",
                by: "d@d.com",
            },
            updated: {
                at: "2018-01-21T11:26:31.9366796Z",
                by: "d@d.com",
            },
            upvoteCount: 6,
        },
        {
            id: "68f7a3b4-0616-4ad2-8f9e-bf1477627e7e",
            value: "Hello once again!",
            created: {
                at: "2018-01-21T11:26:40.7914142Z",
                by: "d@d.com",
            },
            updated: {
                at: "2018-01-21T11:26:40.7914142Z",
                by: "d@d.com",
            },
            upvoteCount: 8,
        },
    ],
    "channel-id-3": [],
}

export const message = {
    id: idFixture,
    value: messageBodyFixture,
    created: {
        at: isoDateFixture,
        by: emailFixture,
    },
    updated: null,
    upvoteCount: 0,
}

export const editedMessage = {
    ...message,
    value: "Edited Message Body",
}

export const upvotedMessage = {
    ...message,
    upvoteCount: 1,
}

export const messageDTO = {
    id: idFixture,
    value: "Message Body",
    createdAt: isoDateFixture,
    createdBy: "email@example.com",
    updatedAt: "",
    updatedBy: "",
    customData: "{\"upvoteCount\":0}",
}

export const upvotedMessageDTO = {
    ...messageDTO,
    customData: "{\"upvoteCount\":1}",
}

export const editedMessageDTO = {
    ...messageDTO,
    value: editedMessage.value,
}

export const user = createUser(emailFixture, nameFixture)

export const editedUser = {
    ...user,
    name: "Fero Mrkvicka",
    image: "base64 encoded avataris",
}
export const userDTO = {
    email: "email@example.com",
    customData: "{\"name\":\"John Doe\",\"image\":null}",
}

export const userUpdateDTO = "{\"name\":\"John Doe\",\"image\":null}"

export const headersFixture = { "Content-Type": "application/json" }


export const tokenFixture = "email@example.com"

export const authFixture = {
    token: tokenFixture,
    email: emailFixture,
}
