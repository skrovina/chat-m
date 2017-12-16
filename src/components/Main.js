// @flow

import React from "react"
import { connect } from "react-redux"
import { List } from "antd"
import styled from "styled-components"
import { Button, Col, FormControl, Grid, Row } from "react-bootstrap"
import { ChannelHeader } from "./ChannelHeader"
import { ChannelsHeader } from "./ChannelsHeader"
import { Route, withRouter } from "react-router-dom"
import { AddChannel } from "./AddChannel"
import { ChannelList } from "./ChannelList"


const LeftCol = styled.div`
    display: flex;
    flex: 1;
    justify-content: stretch;
    flex-direction: column;
    align-items: stretch;
    overflow: scroll;
`
const RightCol = styled.div`
    display: flex;
    flex: 2;
    justify-content: stretch;
    border-left: 1px solid lightgrey;
    flex-direction: column;
    align-items: stretch;
    overflow: scroll;
`

const Flex = styled.div`
    display: flex;
    justify-content: stretch;
    flex: auto;
    align-items: stretch;
    height: 100%;
    min-height: 100%;
`

const Profile = styled.div`
    display: flex;
    height: 5em;
    background-color: papayawhip;
`

const MessageList = styled.div`
    display: flex;
    flex-direction: column;
    background-color: red;
    flex: auto;
`

const ModalContainer = styled.div`
    min-height: 100%;
    height: 100%;
`

type MainProps = {} & { match: * }

export class MainC extends React.Component<*, *> {
    props: MainProps

    render() {
        return (
            <ModalContainer>
                <Flex>
                    <LeftCol>
                        <ChannelsHeader />
                        <ChannelList/>
                        <Profile />
                    </LeftCol>
                    <RightCol>
                        <ChannelHeader />
                        <MessageList />
                    </RightCol>
                </Flex>
                <Route path={`${this.props.match.url}/add-channel`} component={AddChannel}/>
            </ModalContainer>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export const Main = connect(mapStateToProps, mapDispatchToProps)(MainC)
