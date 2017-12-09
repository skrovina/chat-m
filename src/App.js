// @flow

import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Content } from "./content/Content"


class App extends React.Component {
    render() {
        return (
            <div>
                <Content />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
