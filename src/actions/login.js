// @flow

import type { Auth, User } from "../types"


export const LOGIN_REQUESTED = "login/requested"
export const createActionLoginRequested = () => ({
    type: LOGIN_REQUESTED,
})

export const LOGIN_ERROR_NOT_REGISTERED = "login/error/notRegistered"
export const createActionLoginErrorNotRegistered = () => ({
    type: LOGIN_ERROR_NOT_REGISTERED,
})
export const LOGIN_ERROR_GENERAL = "login/error/general"
export const createActionLoginErrorGeneral = () => ({
    type: LOGIN_ERROR_GENERAL,
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

export const SIGNUP_ERROR_ALREADY_EXISTS = "signup/error/alreadyExists"
export const createActionSignupErrorAlreadyExists = () => ({
    type: SIGNUP_ERROR_ALREADY_EXISTS,
})
export const SIGNUP_ERROR_GENERAL = "signup/error/general"
export const createActionSignupErrorGeneral = () => ({
    type: SIGNUP_ERROR_GENERAL,
})
