// @flow

import React from "react"
import { connect } from "react-redux"
import { Button } from "antd"
import { Header } from "./Header"
import { createActionGoToChannelsAdd } from "../actions/channels/channels"

type ChannelsHeaderProps = {|
    addChannel: () => void,
|}

class ChannelsHeaderC extends React.Component<*> {
    props: ChannelsHeaderProps

    render() {
        return (
            <Header>
                <h4>Channels</h4>
                <Button onClick={() => this.props.addChannel()}>Add</Button>
            </Header>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    addChannel: createActionGoToChannelsAdd,
}

export const ChannelsHeader = connect(mapStateToProps, mapDispatchToProps)(ChannelsHeaderC)
