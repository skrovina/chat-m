// @flow

import type { Auth } from "../types"


export const LOGIN_REQUESTED = "login/requested"
export const createActionLoginRequested = () => ({
    type: LOGIN_REQUESTED,
})

export const LOGIN_AUTHORIZED = "login/authorized"
export const createActionLoginAuthorized = (auth: Auth) => ({
    type: LOGIN_AUTHORIZED,
    payload: {
        auth: auth,
    },
})
