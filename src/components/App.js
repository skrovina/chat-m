// @flow

import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Content } from "./Content"
import { createActionAppLoaded } from "../actions/app"


type AppProps = {|
    onAppLoad: () => void,
|}

class App extends React.PureComponent<*, *> {
    props: AppProps

    componentWillMount() {
        this.props.onAppLoad()
    }

    render() {
        return (
            <div>
                <Content />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    onAppLoad: createActionAppLoaded,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
