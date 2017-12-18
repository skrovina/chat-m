// @flow

import React from "react"
import { connect } from "react-redux"
import { Menu } from "antd"
import { getUserChannelsSorted } from "../../selectors/channels"
import type { Channel } from "../../types"
import { createActionChannelsSelect } from "../../actions/channels/channels"
import { getActiveChannelId } from "../../selectors/activeChannel"

type ChannelListProps = {|
    channels: Channel[],
    activeChannelId: ?string,
    onClick: (string) => void,
|}

class ChannelListC extends React.Component<*> {
    props: ChannelListProps

    onClick = ({ key }) => this.props.onClick(key)

    render() {
        return (
            <Menu
                selectedKeys={this.props.activeChannelId
                    ? [this.props.activeChannelId]
                    : []}
                onClick={this.onClick}>
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
    activeChannelId: getActiveChannelId(state),
})

const mapDispatchToProps = {
    onClick: createActionChannelsSelect,
}

export const ChannelList = connect(mapStateToProps, mapDispatchToProps)(ChannelListC)
