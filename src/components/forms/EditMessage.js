// @flow

import React from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Button, Form, Modal } from "antd"
import { createActionModalDismiss } from "../../actions/channels/addChannel"
import { getSignedUser } from "../../selectors/users"
import { FormInput } from "./FormInput"
import { createActionEditMessageSubmit, createActionDeleteMessageSubmit } from "../../actions/messages"
import { getChannelMessageById } from "../../selectors/channelMessages"


export const editMessageComponent = (messageId: string) => {
    class EditMessageC extends React.Component<*> {
        props: *

        onDelete = () => {
            this.props.onDelete(messageId)
        }

        onSubmit = () => {
            this.props.onSubmit(messageId)
        }

        render() {
            return (
                <Modal
                    title="Edit Message"
                    visible={true}
                    onCancel={this.props.onCancel}
                    footer={[
                        <Button
                            type="danger"
                            onClick={this.onDelete}>
                            Delete Message
                        </Button>,
                        <Button key="cancel" onClick={this.props.onCancel}>Cancel</Button>,
                        <Button
                            key="submit"
                            type="primary"
                            htmlType="submit"
                            disabled={this.props.submitting
                            || this.props.pristine
                            || this.props.invalid}
                            onClick={this.props.handleSubmit(this.onSubmit)}>
                            Submit
                        </Button>,
                    ]}>
                    <Form>
                        <Field
                            name="body"
                            label="Edit Message Body"
                            placeholder={this.props.user && this.props.user.name}
                            component={FormInput} />
                    </Form>
                </Modal>
            )
        }
    }

    const mapStateToProps = (state) => {
        const channelMessage = getChannelMessageById(messageId, state)
        const channelId = channelMessage && channelMessage[0]
        const message = channelMessage && channelMessage[1]

        return {
            channelId: channelId,
            message: message,
            user: getSignedUser(state),
            initialValues: {
                body: message && message.value,
            },
        }
    }

    const mapDispatchToProps = {
        onSubmit: createActionEditMessageSubmit,
        onDelete: createActionDeleteMessageSubmit,
        onCancel: createActionModalDismiss,
    }

    return connect(mapStateToProps, mapDispatchToProps)(reduxForm({
        form: "edit-message",
        destroyOnUnmount: true,
    })(EditMessageC))
}
