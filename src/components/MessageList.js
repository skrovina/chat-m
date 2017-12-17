// @flow

import React from "react"
import { connect } from "react-redux"
import { List } from "antd"
import type { Channel, Message } from "../types"
import { createActionChannelsSelect } from "../actions/channels/channels"
import { getAllUsers, getSignedInUserEmail } from "../selectors/users"
import { getActiveChannelMessagesSortedFiltered } from "../selectors/channelMessages"
import type { UsersStateObject } from "../reducers/users"
import {
    createActionGotoMessageEdit, createActionMessageDownvote,
    createActionMessageUpvote,
} from "../actions/messages"
import { MessageBubble } from "./MessageBubble"


type MessageListProps = {|
    messages: Channel[],
    users: UsersStateObject,
    signedUserEmail: ?string,
    onMessageUpvote: (string) => void,
    onMessageDownvote: (string) => void,
    onMessageEdit: (string) => void,
    onClick: (string) => void,
|}

class MessageListC extends React.Component<*> {
    props: MessageListProps

    onClick = ({ key }) => this.props.onClick(key)

    render() {

        return (
            <List
                dataSource={this.props.messages || []}
                renderItem={(message: Message) => {
                    const my = message.created.by === this.props.signedUserEmail
                    const creator = this.props.users[message.created.by]

                    return (
                        <MessageBubble
                            message={message}
                            creator={creator}
                            my={my}
                            onUpvote={this.props.onMessageUpvote}
                            onDownvote={this.props.onMessageDownvote}
                            onEdit={this.props.onMessageEdit}
                        />
                    )
                }}
            />
        )
    }
}


const mapStateToProps = (state) => ({
    messages: getActiveChannelMessagesSortedFiltered(state),
    users: getAllUsers(state),
    signedUserEmail: getSignedInUserEmail(state),
})

const mapDispatchToProps = {
    onMessageUpvote: createActionMessageUpvote,
    onMessageDownvote: createActionMessageDownvote,
    onMessageEdit: createActionGotoMessageEdit,
    onClick: createActionChannelsSelect,
}

export const MessageList = connect(mapStateToProps, mapDispatchToProps)(MessageListC)
