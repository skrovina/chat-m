// @flow

import React from "react"
import { Redirect, Route, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { getAuth } from "../selectors/auth"


const PrivateRouteC = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={(props: Object) => (
            auth ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: "/login",
                    state: { from: props.location },
                }} />
            )
        )} />
)


const mapStateToProps = (state) => ({
    auth: getAuth(state),
})

const mapDispatchToProps = {}

export const PrivateRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRouteC))
