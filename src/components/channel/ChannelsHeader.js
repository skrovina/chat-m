// @flow

import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Button, Dropdown, Menu } from "antd"
import { Header } from "../Header"
import { createActionGoToChannelsAdd } from "../../actions/channels/channels"
import { createActionLogOut } from "../../actions/logout"

type ChannelsHeaderProps = {|
    addChannel: () => void,
    logOut: () => void,
|}

const menu = (logOut: () => void) => (
    <Menu>
        <Menu.Item>
            <Link to="/app/edit-profile">Edit Profile</Link>
        </Menu.Item>
        <Menu.Item>
            <Link onClick={logOut} to="">Log Out</Link>
        </Menu.Item>
    </Menu>
)

class ChannelsHeaderC extends React.Component<*> {
    props: ChannelsHeaderProps

    render() {
        return (
            <Header>
                <Dropdown trigger={["click"]} overlay={menu(this.props.logOut)}>
                    <Button icon="setting" shape="circle" />
                </Dropdown>
                <h4>Channels</h4>
                <Button
                    icon="plus"
                    onClick={() => this.props.addChannel()}></Button>
            </Header>
        )
    }
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = {
    addChannel: createActionGoToChannelsAdd,
    logOut: createActionLogOut,
}

export const ChannelsHeader = connect(mapStateToProps, mapDispatchToProps)(ChannelsHeaderC)
