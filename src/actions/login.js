// @flow

import type { Auth, User } from "../types"


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

export const SIGNUP_REQUESTED = "signup/requested"
export const createActionSignupRequested = () => ({
    type: SIGNUP_REQUESTED,
})

export const SIGNUP_SUCCESS = "signup/authorized"
export const createActionSignupSuccess = (user: User) => ({
    type: SIGNUP_SUCCESS,
    payload: {
        user: user,
    },
})
