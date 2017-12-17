// @flow

import React from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Button, Form, Modal } from "antd"
import { FormInput } from "./forms/FormInput"
import { createActionModalDismiss, createActionAddChannelSubmit } from "../actions/channels/addChannel"

class AddChannelC extends React.Component<*> {
    render() {
        return (
            <Modal
                title="Add New Channel"
                visible={true}
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="cancel" onClick={this.props.onCancel}>Cancel</Button>,
                    <Button
                        key="submit"
                        htmlType="submit"
                        disabled={this.props.submitting
                        || this.props.pristine
                        || this.props.invalid}
                        onClick={this.props.handleSubmit(this.props.onSubmit)}>
                        Submit
                    </Button>,
                ]}>
                <Form>
                    <Field name="name" label="Name" component={FormInput} />
                </Form>
            </Modal>
        )
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
    onSubmit: createActionAddChannelSubmit,
    onCancel: createActionModalDismiss,
}

export const AddChannel = reduxForm({
    form: "add-channel",
    destroyOnUnmount: true,
})(connect(mapStateToProps, mapDispatchToProps)(AddChannelC))
