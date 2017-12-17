// @flow

import React from "react"
import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import { Button, Modal } from "antd"
import { createActionModalDismiss } from "../actions/channels/addChannel"
import { createActionDeleteChannelSubmit } from "../actions/channels/channels"
import { getActiveChannel } from "../selectors/channels"
import { getSignedInUserEmail } from "../selectors/users"


class DeleteChannelC extends React.Component<*> {
    props: *

    render() {
        const canDelete = this.props.channel && this.props.userEmail
            && this.props.channel.creatorEmail === this.props.userEmail
        return (
            <Modal
                title="Delete Channel"
                visible={true}
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="cancel" onClick={this.props.onCancel}>Cancel</Button>,
                    <Button
                        key="submit"
                        type="danger"
                        htmlType="submit"
                        disabled={!canDelete}
                        onClick={this.props.handleSubmit(this.props.onSubmit)}>
                        Submit
                    </Button>,
                ]}>
                <p>
                    {canDelete
                        ? `Are you sure you wish to delete channel ${this.props.channel.name}?`
                        : "You are not the creator of this channel!"}
                </p>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    channel: getActiveChannel(state),
    userEmail: getSignedInUserEmail(state),
})

const mapDispatchToProps = {
    onSubmit: createActionDeleteChannelSubmit,
    onCancel: createActionModalDismiss,
}

export const DeleteChannel = reduxForm({
    form: "delete-channel",
    destroyOnUnmount: true,
})(connect(mapStateToProps, mapDispatchToProps)(DeleteChannelC))
