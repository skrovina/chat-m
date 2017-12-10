// @flow

export type Auth = {|
    token: string,
    email: string,
|}

export type User = {|
    email: string,

    name: string,
    // BASE64 encoded image
    image: string,
    channelIds: string[],
|}

export type UserDTO = {|
    email: string,
    customData: string,
|}

export type Channel = {|
    id: string,
    name: string,

    creatorEmail: string,
|}

export type ChannelDTO = {|
    id: string,
    name: string,
    customData: string,
|}

export type Message = {|
    id: string,
    value: string,
    createdAt: string,
    createdBy: string,
    updatedAt: string,
    updatedBy: string,

    upvoteCount: number,
|}

export type MessageDTO = {|
    id: string,
    value: string,
    createdAt: string,
    createdBy: string,
    updatedAt: string,
    updatedBy: string,
    customData: string,
|}
