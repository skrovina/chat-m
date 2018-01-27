// @flow

import React from "react"
import styled from "styled-components"
import { Button, Input } from "antd"
import { connect } from "react-redux"
import { Header } from "../Header"
import { createActionMessageComposeSend, createActionMessageComposeTextChanged } from "../../actions/messages"
import { getActiveChannelNewMessageText, getNewMessageTextValid } from "../../selectors/activeChannelSelectors"

const HeaderWithTopBorder = styled(Header)`
    border-top: 1px solid lightgrey;
`

type MessageComposerProps = {|
    messageText: string,
    canSend: boolean,
    onTextChanged: (string) => void,
    send: () => void,
|}

class MessageComposerC extends React.Component<*> {
    props: MessageComposerProps

    onTextChanged = (e) => this.props.onTextChanged(e.target.value)

    render() {
        return (
            <HeaderWithTopBorder>
                <Input
                    style={{ marginRight: 15 }}
                    onChange={this.onTextChanged}
                    onPressEnter={this.props.send}
                    placeholder={"New message…"}
                    value={this.props.messageText} />
                <Button
                    type="primary"
                    disabled={!this.props.canSend}
                    onClick={this.props.send}>Send</Button>
            </HeaderWithTopBorder>
        )
    }
}

const mapStateToProps = (state) => ({
    messageText: getActiveChannelNewMessageText(state),
    canSend: getNewMessageTextValid(state),
})

const mapDispatchToProps = {
    onTextChanged: createActionMessageComposeTextChanged,
    send: createActionMessageComposeSend,
}

export const MessageComposer = connect(mapStateToProps, mapDispatchToProps)(MessageComposerC)
