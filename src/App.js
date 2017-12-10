// @flow

import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Content } from "./components/Content"
import { logIn } from "./api/httpRequests"
import { getHttpHeaders } from "./selectors/httpHeaders"
import type { StateObject } from "./reducers/app"

type AppProps = {|
    +state: StateObject,
|}

class App extends React.Component<*, *> {
    props: AppProps

    render() {
        logIn("mato@figurepos.com", getHttpHeaders(this.props.state))
            .then((auth) => console.log(auth))

        return (
            <div>
                <Content />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ state: state })

const mapDispatchToProps = {}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
