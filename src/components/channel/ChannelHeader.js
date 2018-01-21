// @flow

import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Dropdown, Input, Menu } from "antd"
import styled from "styled-components"
import { Header } from "../Header"
import { createActionMessageSearchTextChanged } from "../../actions/messages"
import { getActiveChannel } from "../../selectors/channels"
import type { Channel } from "../../types"

type ChannelHeaderProps = {|
    channel: ?Channel,
    onSearch: (string) => void,
|}


const menu = (
    <Menu>
        <Menu.Item>
            <Link to="/app/invite-channel">Invite People</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/app/delete-channel">Delete Channel</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/app/rename-channel">Rename Channel</Link>
        </Menu.Item>
    </Menu>
)

const Title = styled.h4`
    opacity: ${({ translucent }) => (translucent ? 0.4 : 1.0)};
`

class ChannelHeaderC extends React.Component<*> {
    props: ChannelHeaderProps

    render() {
        return (
            <Header>
                <Dropdown trigger={["click"]} overlay={menu} disabled={!this.props.channel}>
                    <Button
                        disabled={!this.props.channel}
                        icon="edit"
                        shape="circle" />
                </Dropdown>
                <Title translucent={!this.props.channel}>
                    {this.props.channel ? this.props.channel.name : "No channel selected"}
                </Title>
                <Input.Search
                    placeholder="Search messages…"
                    onSearch={this.props.onSearch}
                    style={{ maxWidth: 200 }}
                />
            </Header>
        )
    }
}

const mapStateToProps = (state) => ({
    channel: getActiveChannel(state),
})

const mapDispatchToProps = {
    onSearch: createActionMessageSearchTextChanged,
}

export const ChannelHeader = connect(mapStateToProps, mapDispatchToProps)(ChannelHeaderC)
