// @flow

import React from "react"
import { connect } from "react-redux"
import { Button, List, Menu } from "antd"
import { Header } from "./Header"
import { getUserChannelsSorted } from "../selectors/channels"
import type { Channel } from "../types"
import { createActionChannelsSelect } from "../actions/channels/channels"

type ChannelListProps = {|
    channels: Channel[],
    onClick: (string) => void,
|}

class ChannelListC extends React.Component<*> {
    props: ChannelListProps

    onClick = ({ key }) => this.props.onClick(key)

    render() {
        return (
            <Menu onClick={this.onClick}>
                {this.props.channels.map((channel) => (
                    <Menu.Item key={channel.id}>
                        {channel.name}
                    </Menu.Item>
                ))}
            </Menu>
        )
    }
}


const mapStateToProps = (state) => ({
    channels: getUserChannelsSorted(state),
})

const mapDispatchToProps = {
    onClick: createActionChannelsSelect,
}

export const ChannelList = connect(mapStateToProps, mapDispatchToProps)(ChannelListC)
