// @flow

export type Auth = {|
    token: string,
    email: string,
|}

export type ChannelParticipator = {|
    email: string,
    lastReadDate: ?string,
|}

export type User = {|
    email: string,
    name: string,
    // BASE64 encoded image
    image: ?string,
|}

export type UserDTO = {|
    email: string,
    customData: string,
|}

export type Channel = {|
    id: string,
    name: string,
    creatorEmail: string,
    participators: { [key: string]: ChannelParticipator },
|}

export type ChannelDTO = {|
    id: string,
    name: string,
    customData: string,
|}

export type NewChannel = {|
    name: string,
    creatorEmail: string,
    participators: { [key: string]: ChannelParticipator },
|}

export type NewChannelDTO = {|
    name: string,
    customData: string,
|}

export type Message = {|
    id: string,
    value: string,
    created: {|
        at: string,
        by: string,
    |},
    updated: ?{|
        at: string,
        by: string,
    |},
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
