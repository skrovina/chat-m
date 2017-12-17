// @flow

import React from "react"
import { Icon, Avatar } from "antd"
import styled from "styled-components"
import type { Message, User } from "../../types"
import { formatDateTime } from "../../utils/formatters"


const StyledMsg = styled.div`
    display: flex;
    background: white;
    border-radius: 2rem;
    border: 0.5px solid lightgrey;
    padding: 1.3rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: ${({ my }) => (my ? 8 : 1.8)}rem;
    margin-right: ${({ my }) => (!my ? 8 : 1.8)}rem;
`

const LeftCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const CenterCol = styled.div`
    display: flex;
    flex: auto;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-right: 2rem;
    margin-left: 2rem;
`

const RightCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.b`
    font-size: 1.6rem;
`

const Date = styled.div`
    color: darkgray;
    font-size: 1rem;
`

const Upvoter = styled.div`
    display: flex;
    flex: auto;
    flex-direction: column;
    align-items: center;
`

export class MessageBubble extends React.Component<*> {
    props: {|
        creator: User,
        message: Message,
        my: boolean,
        onUpvote: (messageId: string) => void,
        onDownvote: (messageId: string) => void,
        onEdit: (messageId: string) => void,
    |}

    onUpvote = () => {
        this.props.onUpvote(this.props.message.id)
    }

    onDownvote = (messageId: string) => {
        this.props.onDownvote(this.props.message.id)
    }

    onEdit = (messageId: string) => {
        this.props.onEdit(this.props.message.id)
    }

    render() {
        const { creator, message } = this.props
        const name = creator && creator.name
        const title = name || "Anonymous User"
        const avatar = creator && creator.image
        const createdAt = formatDateTime(message.created.at)

        return (
            <StyledMsg my={this.props.my}>
                <LeftCol>
                    <Avatar size="large" icon="user" src={avatar} />
                    {this.props.my ? <a onClick={this.onEdit}>EDIT</a> : null}
                </LeftCol>
                <CenterCol>
                    <Title>{title}</Title>
                    <p>{message.value}</p>
                    <Date>{createdAt}</Date>
                </CenterCol>
                <RightCol>
                    <Upvoter>
                        <a onClick={this.onUpvote}>
                            <Icon type="caret-up" />
                        </a>
                        <div>{message.upvoteCount}</div>
                        <a onClick={this.onDownvote}>
                            <Icon type="caret-down" />
                        </a>
                    </Upvoter>
                </RightCol>
            </StyledMsg>
        )
    }
}
