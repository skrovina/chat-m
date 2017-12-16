// @flow

import React from "react"
import { Redirect, Route, Switch, withRouter } from "react-router-dom"
import { Login } from "./Login"
import { Main } from "./Main"
import styled from "styled-components"
import { PrivateRoute } from "./PrivateRoute"
import { AddChannel } from "./AddChannel"


const ModalContainer = styled.div`
    min-height: 100%;
    height: 100%;
`

export class Content extends React.Component<*> {
    render() {
        return (
            <ModalContainer>
                <Route exact path="/" render={() => <Redirect to="/app" />} />
                <PrivateRoute path="/app" component={Main} />
                <Route exact path="/login" component={Login} />
            </ModalContainer>
        )
    }
}
