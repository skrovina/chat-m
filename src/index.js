import React from "react"
import ReactDOM from "react-dom"

import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { createStore, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import { createEpicMiddleware } from "redux-observable"
import createHistory from "history/createBrowserHistory"
import { ConnectedRouter, routerMiddleware } from "react-router-redux"

import "./index.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import { configureEpics } from "./configureEpics"
import { rootReducer } from "./rootReducer"


const initialState = {}
const deps = {}
const history = createHistory()

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(
        createEpicMiddleware(configureEpics(deps)),
        routerMiddleware(history),
        createLogger({ collapsed: true, diff: true }),
    ))
)

const root = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
)


ReactDOM.render(root, document.getElementById("root"))

registerServiceWorker()
