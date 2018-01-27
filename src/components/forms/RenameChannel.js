// @flow

import React from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Button, Form, Modal } from "antd"
import { FormInput } from "./FormInput"
import { createActionModalDismiss } from "../../actions/channels/addChannel"
import { createActionRenameChannelSubmit } from "../../actions/channels/channels"
import { getActiveChannel } from "../../selectors/activeChannelSelectors"


class RenameChannelC extends React.Component<*> {
    props: *

    render() {
        return (
            <Modal
                title="Rename Channel"
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
                        name="name"
                        label="New Name"
                        placeholder={this.props.channel ? this.props.channel.name : ""}
                        onPressEnter={this.props.handleSubmit(this.props.onSubmit)}
                        component={FormInput} />
                </Form>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    channel: getActiveChannel(state),
})

const mapDispatchToProps = {
    onSubmit: createActionRenameChannelSubmit,
    onCancel: createActionModalDismiss,
}

export const RenameChannel = reduxForm({
    form: "rename-channel",
    destroyOnUnmount: true,
})(connect(mapStateToProps, mapDispatchToProps)(RenameChannelC))
