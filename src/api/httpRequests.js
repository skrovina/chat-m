// @flow

import { createHttpRequest } from "./createHttpRequest"
import { Config } from "../utils/config"
import type { Channel, ChannelDTO, MessageDTO, NewChannel, NewChannelDTO, UserDTO, UserUpdateDTO } from "../types"


const baseUrl: string = Config.SERVER_URL
const appId: string = Config.APP_ID

export const logIn = (email: string, headers: Object): Promise<string> =>
    createHttpRequest({
        method: "POST",
        url: baseUrl + "/auth",
        body: email,
        headers: headers,
    })

export const getAllUsers = (headers: Object): Promise<UserDTO[]> =>
    createHttpRequest({
        method: "GET",
        url: `${baseUrl}/${appId}/user`,
        headers: headers,
    })

export const registerUser = (user: UserDTO, headers: Object): Promise<UserDTO[]> =>
    createHttpRequest({
        method: "POST",
        url: `${baseUrl}/${appId}/user`,
        headers: headers,
        body: user,
    })

export const getUser = (email: string, headers: Object): Promise<UserDTO> =>
    createHttpRequest({
        method: "GET",
        url: `${baseUrl}/${appId}/user/${email}`,
        headers: headers,
    })

export const updateUser = (email: string, userUpdate: UserUpdateDTO, headers: Object): Promise<UserDTO> =>
    createHttpRequest({
        method: "PUT",
        url: `${baseUrl}/${appId}/user/${email}`,
        headers: headers,
        body: userUpdate,
    })

export const getChannels = (headers: Object): Promise<[ChannelDTO]> =>
    createHttpRequest({
        method: "GET",
        url: `${baseUrl}/app/${appId}`,
        headers: headers,
    }).then((response: { id: string, channels: [ChannelDTO] }) => response.channels)

export const addChannel = (channel: NewChannelDTO, headers: Object): Promise<[ChannelDTO]> =>
    createHttpRequest({
        method: "PATCH",
        url: `${baseUrl}/app/${appId}`,
        headers: headers,
        body: [{
            op: "add",
            path: "/channels/-",
            value: channel,
        }],
    }).then((response: { id: string, channels: [ChannelDTO] }) => response.channels)

export const deleteChannel = (channel: ChannelDTO, headers: Object): Promise<[ChannelDTO]> =>
    createHttpRequest({
        method: "PATCH",
        url: `${baseUrl}/app/${appId}`,
        headers: headers,
        body: [{
            op: "remove",
            path: `/channels/${channel.id}`,
        }],
    }).then((response: { id: string, channels: [ChannelDTO] }) => response.channels)

export const updateChannel = (channel: ChannelDTO, headers: Object): Promise<[ChannelDTO]> =>
    createHttpRequest({
        method: "PATCH",
        url: `${baseUrl}/app/${appId}`,
        headers: headers,
        body: [{
            op: "replace",
            path: `/channels/${channel.id}`,
            value: channel,
        }],
    }).then((response: { id: string, channels: [ChannelDTO] }) => response.channels)

export const getChannelMessages = (channelId: string, headers: Object): Promise<[MessageDTO]> =>
    createHttpRequest({
        method: "GET",
        url: `${baseUrl}/app/${appId}/channel/${channelId}/message`,
        headers: headers,
    })

export const postChannelMessage = (channelId: string, message: MessageDTO, headers: Object): Promise<[MessageDTO]> =>
    createHttpRequest({
        method: "POST",
        url: `${baseUrl}/app/${appId}/channel/${channelId}/message`,
        headers: headers,
        body: message,
    })

export const deleteChannelMessage = (channelId: string, messageId: string, headers: Object): Promise<[MessageDTO]> =>
    createHttpRequest({
        method: "DELETE",
        url: `${baseUrl}/app/${appId}/channel/${channelId}/message/${messageId}`,
        headers: headers,
    })

export const updateChannelMessage = (channelId: string, message: MessageDTO, headers: Object): Promise<[MessageDTO]> =>
    createHttpRequest({
        method: "PUT",
        url: `${baseUrl}/app/${appId}/channel/${channelId}/message/${message.id}`,
        headers: headers,
        body: message,
    })
