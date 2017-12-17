// @flow

import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Route } from "react-router-dom"
import { ChannelHeader } from "./ChannelHeader"
import { ChannelsHeader } from "./ChannelsHeader"
import { AddChannel } from "./AddChannel"
import { ChannelList } from "./ChannelList"
import { MessageList } from "./MessageList"
import { MessageComposer } from "./MessageComposer"
import { InviteChannel } from "./InviteChannel"
import { DeleteChannel } from "./DeleteChannel"
import { RenameChannel } from "./RenameChannel"
import { EditProfile } from "./EditProfile"
import { editMessageComponent } from "./EditMessage"


const LeftCol = styled.div`
    border-right: 1px solid lightgrey;
    display: flex;
    flex: 1;
    justify-content: stretch;
    flex-direction: column;
    align-items: stretch;
`
const RightCol = styled.div`
    display: flex;
    flex: 2;
    justify-content: stretch;
    flex-direction: column;
    align-items: stretch;
`

const Flex = styled.div`
    display: flex;
    justify-content: stretch;
    flex: auto;
    align-items: stretch;
    height: 100%;
    min-height: 100%;
`

const MessageListContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: auto;
    overflow: scroll;
`

const ModalContainer = styled.div`
    min-height: 100%;
    height: 100%;
`

const ChannelListScroller = styled.div`
    display: flex;
    flex: auto;
    flex-direction: column;
    justify-content: flex-start;
    overflow: scroll;
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
                        <ChannelListScroller>
                            <ChannelList />
                        </ChannelListScroller>
                    </LeftCol>
                    <RightCol>
                        <ChannelHeader />
                        <MessageListContainer>
                            <MessageList />
                        </MessageListContainer>
                        <MessageComposer />
                    </RightCol>
                </Flex>
                <Route path={`${this.props.match.url}/add-channel`} component={AddChannel}/>
                <Route path={`${this.props.match.url}/invite-channel`} component={InviteChannel}/>
                <Route path={`${this.props.match.url}/delete-channel`} component={DeleteChannel}/>
                <Route path={`${this.props.match.url}/rename-channel`} component={RenameChannel}/>
                <Route path={`${this.props.match.url}/edit-profile`} component={EditProfile} />
                <Route
                    path={`${this.props.match.url}/message/:id`}
                    render={(props) => {
                        const Comp = editMessageComponent(props.match.params.id)
                        return <Comp />
                    }} />
            </ModalContainer>
        )
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export const Main = connect(mapStateToProps, mapDispatchToProps)(MainC)
