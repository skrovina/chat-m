// @flow

import React from "react"
import { Field, reduxForm } from "redux-form"
import { Redirect } from "react-router-dom"
import { Form, Button, Alert } from "antd"
import { connect } from "react-redux"
import type { FormProps } from "redux-form"
import styled from "styled-components"

import { FormInput } from "./forms/FormInput"
import { getAuth } from "../selectors/auth"
import type { Auth } from "../types"
import { createActionLoginRequested, createActionSignupRequested } from "../actions/login"


const TopLevelContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: auto;
    align-items: center;
    margin-top: 10%;
`

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-width: 25rem;
`

const ButtonRow = styled.div`
    display: flex;
    justify-content: space-between;
`

export const isEmailAddressValid = (email: ?string) => email != null && /.+@.+\..+/.test(email)


const validate = (values: Object) => ({
    ...isEmailAddressValid(values.email) ? {} : { email: "Invalid email" },
})

const Title = styled.h1`
    margin-bottom: 5rem;
    text-align: center;
`

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
            <TopLevelContainer>
                <FormContainer>
                    <Title>Log In</Title>
                    <Form>
                        <Field
                            name="email"
                            label="E-mail"
                            component={FormInput}
                            onPressEnter={this.props.onLogin}
                        />
                        { this.props.error &&
                            <Alert message={this.props.error} type="error" />
                        }
                        <ButtonRow>
                            <Button
                                type="dashed"
                                loading={false}
                                disabled={this.props.submitting
                                || this.props.pristine
                                || this.props.invalid}
                                onClick={this.props.onSignUp}>
                                Sign Up
                            </Button>
                            <Button
                                loading={this.props.submitting}
                                type="primary"
                                onClick={this.props.onLogin}
                                disabled={this.props.submitting
                                || this.props.pristine
                                || this.props.invalid}>
                                Log In
                            </Button>
                        </ButtonRow>
                    </Form>
                </FormContainer>
            </TopLevelContainer>
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
