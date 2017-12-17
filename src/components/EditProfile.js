// @flow

import React from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Button, Form, Modal } from "antd"
import { createActionModalDismiss } from "../actions/channels/addChannel"
import { getActiveChannel } from "../selectors/channels"
import { getSignedUser } from "../selectors/users"
import { createActionEditProfileSubmit } from "../actions/profile"
import { FormInput } from "./forms/FormInput"
import { FormFileInput } from "./forms/FormFileInput"


class EditProfileC extends React.Component<*> {
    props: *

    render() {
        return (
            <Modal
                title="Edit Profile"
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
                        label="Name"
                        placeholder={this.props.user && this.props.user.name}
                        component={FormInput}
                    />
                    <Field
                        name="avatar"
                        label="Avatar"
                        component={FormFileInput}
                    />
                </Form>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    channel: getActiveChannel(state),
    user: getSignedUser(state),
})

const mapDispatchToProps = {
    onSubmit: createActionEditProfileSubmit,
    onCancel: createActionModalDismiss,
}

export const EditProfile = reduxForm({
    form: "edit-profile",
    destroyOnUnmount: true,
})(connect(mapStateToProps, mapDispatchToProps)(EditProfileC))
