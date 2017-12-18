// @flow

import React from "react"
import { message } from "antd"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Content } from "./Content"
import { createActionAppLoaded } from "../actions/app"
import { getNotification } from "../selectors/notification"
import type { NotificationMessageType } from "../reducers/notificationMessage"


type AppProps = {|
    notification: ?NotificationMessageType,
    onAppLoad: () => void,
|}

class App extends React.Component<*, *> {
    props: AppProps

    componentWillMount() {
        this.props.onAppLoad()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.notification
            && this.props.notification !== nextProps.notification) {

            const notification = nextProps.notification
            switch (notification.type) {
                case "success":
                    message.success(notification.content)
                    break
                case "warning":
                    message.warning(notification.content)
                    break
                case "error":
                default:
                    message.error(notification.content)
                    break
            }
        }
    }

    render() {
        return (
            <Content />
        )
    }
}

const mapStateToProps = (state) => ({
    notification: getNotification(state),
})

const mapDispatchToProps = {
    onAppLoad: createActionAppLoaded,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
