// @flow

import React from "react"
import { connect } from "react-redux"
import { Button } from "antd"
import { Header } from "./Header"


class ChannelHeaderC extends React.Component<*> {
    render() {
        return (
            <Header>
                <h4>Channel 4</h4>
                <input placeholder="Search messages…"></input>
            </Header>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export const ChannelHeader = connect(mapStateToProps, mapDispatchToProps)(ChannelHeaderC)
