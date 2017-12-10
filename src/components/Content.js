// @flow

import React from "react"
import { Route, Switch } from "react-router-dom"


export class Content extends React.Component<{}> {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Dummy}/>
                </Switch>
            </div>
        )
    }
}

const Dummy = () => <p>Dummy</p>
