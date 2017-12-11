// @flow

import React from "react"
import { Route, Switch } from "react-router-dom"
import { Login } from "./Login"
import { PrivateRoute } from "./PrivateRoute"


export class Content extends React.Component<*> {
    render() {
        return (
            <div>
                <Switch>
                    <PrivateRoute exact path="/" component={Dummy}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </div>
        )
    }
}


const Dummy = () => <p>Dummy</p>
