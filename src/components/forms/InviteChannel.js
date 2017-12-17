// @flow

import React from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Button, Form, Modal } from "antd"
import { FormInput } from "./FormInput"
import { createActionModalDismiss } from "../../actions/channels/addChannel"
import { createActionInviteChannelSubmit } from "../../actions/channels/channels"


class InviteChannelC extends React.Component<*> {
    render() {
        return (
            <Modal
                title="Invite People To Channel"
                visible={true}
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="cancel" onClick={this.props.onCancel}>Cancel</Button>,
                    <Button
                        key="submit"
                        type="primary"
                        htmlType="submit"
                        disabled={this.props.submitting
                        || this.props.pristine
                        || this.props.invalid}
                        onClick={this.props.handleSubmit(this.props.onSubmit)}>
                        Submit
                    </Button>,
                ]}>
                <Form>
                    <Field
                        name="email"
                        label="Email"
                        component={FormInput}
                        onPressEnter={this.props.handleSubmit(this.props.onSubmit)} />
                </Form>
            </Modal>
        )
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
    onSubmit: createActionInviteChannelSubmit,
    onCancel: createActionModalDismiss,
}

export const InviteChannel = reduxForm({
    form: "invite-channel",
    destroyOnUnmount: true,
})(connect(mapStateToProps, mapDispatchToProps)(InviteChannelC))
