// @flow

import React from "react"
import { message } from "antd"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Content } from "./Content"
import { createActionAppLoaded } from "../actions/app"
import { getNotification } from "../selectors/notification"
import type { NotificationMessageType } from "../reducers/notificationMessage"
import { isLoading } from "../selectors/loading"


type AppProps = {|
    notification: ?NotificationMessageType,
    loading: boolean,
    onAppLoad: () => void,
|}

class App extends React.Component<*, *> {
    props: AppProps
    hideLoading = null

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
        if (this.props.loading !== nextProps.loading) {
            if (nextProps.loading) {
                this.hideLoading = message.loading("App is syncing...", 0)
            }
            else if (this.hideLoading) {
                this.hideLoading()
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
    loading: isLoading(state),
})

const mapDispatchToProps = {
    onAppLoad: createActionAppLoaded,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
