// @flow

import React from "react"
import { Field, reduxForm } from "redux-form"
import { Redirect } from "react-router-dom"
import { Button } from "react-bootstrap"
import { connect } from "react-redux"
import type { FormProps } from "redux-form"

import { FormInput } from "./forms/FormInput"
import { getAuth } from "../selectors/auth"
import type { Auth } from "../types"
import { createActionLoginRequested } from "../actions/login"
import { logIn } from "../api/httpRequests"


export const isEmailAddressValid = (email: ?string) => email != null && /.+@.+\..+/.test(email)


const validate = (values: Object) => ({
    ...isEmailAddressValid(values.email) ? {} : { email: "Invalid email" },
})


type LoginCProps = {
    auth: Auth,
    onLogin: (Object) => void,
} & FormProps

class LoginC extends React.PureComponent<*> {
    props: LoginCProps

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } }

        if (this.props.auth) {
            return (
                <Redirect to={from} />
            )
        }

        return (
            <form onSubmit={this.props.handleSubmit(this.props.onLogin)}>
                <Field name="email" label="E-mail" component={FormInput} />
                <Field name="name" label="Name" component={FormInput} />
                <Button
                    type="submit"
                    disabled={this.props.submitting
                    || this.props.pristine
                    || this.props.invalid}>
                    Log In
                </Button>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: getAuth(state),
})

const mapDispatchToProps = {
    onLogin: createActionLoginRequested,
}

export const Login = reduxForm({
    form: "login",
    destroyOnUnmount: true,
    validate: validate,
})(connect(mapStateToProps, mapDispatchToProps)(LoginC))
