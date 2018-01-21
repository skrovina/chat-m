import { createNewChannel } from "../entityCreators/channel"
import { createMessage } from "../entityCreators/message"
import { uuid } from "../utils/uuidGenerator"
import { getIsoDate } from "../utils/clock"
import { createUser } from "../entityCreators/user"

jest.mock("../utils/uuidGenerator")
jest.mock("../utils/clock")

export const idFixture = "totaly-not-random-id-1"
export const isoDateFixture = "2018-01-21T15:54:34.522Z"

uuid.mockImplementation(() => idFixture)
getIsoDate.mockImplementation(() => isoDateFixture)


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

export const message = createMessage("Message Body", "email@example.com")

export const messageDTO = {
    id: idFixture,
    value: "Message Body",
    createdAt: isoDateFixture,
    createdBy: "email@example.com",
    updatedAt: "",
    updatedBy: "",
    customData: "{\"upvoteCount\":0}",
}

export const user = createUser("email@example.com", "John Doe")

export const userDTO = {
    email: "email@example.com",
    customData: "{\"name\":\"John Doe\",\"image\":null}"
}

export const userUpdateDTO = "{\"name\":\"John Doe\",\"image\":null}"
