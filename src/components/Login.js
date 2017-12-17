// @flow

import React from "react"
import { Field, reduxForm } from "redux-form"
import { Link, Redirect } from "react-router-dom"
import { Form, Button } from "antd"
import { connect } from "react-redux"
import type { FormProps } from "redux-form"
import styled from "styled-components"

import { FormInput } from "./forms/FormInput"
import { getAuth } from "../selectors/auth"
import type { Auth } from "../types"
import { createActionLoginRequested, createActionSignupRequested } from "../actions/login"


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: auto;
    align-items: center;
    margin-top: 10%;
`

const ButtonRow = styled.div`
    display: flex;
    justify-content: space-between;
`

export const isEmailAddressValid = (email: ?string) => email != null && /.+@.+\..+/.test(email)


const validate = (values: Object) => ({
    ...isEmailAddressValid(values.email) ? {} : { email: "Invalid email" },
})


type LoginCProps = {
    auth: Auth,
    onLogin: (Object) => void,
} & FormProps

class LoginC extends React.Component<*> {
    props: LoginCProps

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } }

        if (this.props.auth) {
            return (
                <Redirect to={from} />
            )
        }

        return (
            <Container>
                <h1>Log In</h1>
                <Form onSubmit={this.props.handleSubmit(this.props.onLogin)}>
                    <Field name="email" label="E-mail" component={FormInput} />
                    <Field name="name" label="Name" component={FormInput} />
                    <ButtonRow>
                        <Button
                            htmlType="submit"
                            type="primary"
                            disabled={this.props.submitting
                            || this.props.pristine
                            || this.props.invalid}>
                            Log In
                        </Button>
                        <Button
                            type="dashed"
                            disabled={this.props.submitting
                            || this.props.pristine
                            || this.props.invalid}
                            onClick={this.props.onSignUp}>
                            Sign Up
                        </Button>
                    </ButtonRow>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: getAuth(state),
})

const mapDispatchToProps = {
    onLogin: createActionLoginRequested,
    onSignUp: createActionSignupRequested,
}

export const Login = reduxForm({
    form: "login",
    destroyOnUnmount: true,
    validate: validate,
})(connect(mapStateToProps, mapDispatchToProps)(LoginC))
