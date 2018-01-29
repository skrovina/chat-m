// @flow

import Rx from "rxjs"
import { getFormValues, startSubmit, stopSubmit } from "redux-form"
import type { EpicDeps } from "../utils/configureEpics"
import {
    createActionLoginAuthorized,
    createActionLoginErrorGeneral,
    createActionLoginErrorNotRegistered,
    createActionSignupErrorAlreadyExists,
    createActionSignupErrorGeneral,
    createActionSignupSuccess,
    LOGIN_AUTHORIZED,
    LOGIN_REQUESTED,
    SIGNUP_REQUESTED,
    SIGNUP_SUCCESS,
} from "../actions/login"
import { logIn, registerUser } from "../api/httpRequests"
import { getHttpHeaders } from "../selectors/httpHeaders"
import { createActionSyncStart } from "../actions/sync"
import type { User, UserDTO } from "../types"
import { userDTOToUser, userToUserDTO } from "../modelTransform/user"
import { createActionUserUpdate } from "../actions/users"
import { createUser } from "../entityCreators/user"
import { createActionShowSuccess } from "../actions/notificationDisplay"


export const logInEpic = (action$: Object, deps: EpicDeps) =>
    action$.ofType(LOGIN_REQUESTED)
        .switchMap(() => {
            console.log("started")
            const { email } = getFormValues("login")(deps.getState())
            const headers = getHttpHeaders(deps.getState())
            if (!email) {
                throw new Error("Cannot get email from form")
            }

            return Rx.Observable.from(logIn(email, headers))
                .map((token) =>
                    createActionLoginAuthorized({ token: token, email: email }))
                .catch((e) => {
                    return e.status === 400
                        ? [stopSubmit("login"), createActionLoginErrorNotRegistered()]
                        : [stopSubmit("login"), createActionLoginErrorGeneral()]
                })
        })

export const logInSubmit = (action$: Object, deps: EpicDeps) =>
    action$.ofType(LOGIN_REQUESTED)
        .map(() => startSubmit("login"))

export const loginAuthorizedSaveAuth = (localStorage: Object) =>
    (action$: Object, deps: EpicDeps) =>
        action$.ofType(LOGIN_AUTHORIZED)
            .switchMap((action) => {
                const { payload: { auth } } = action
                localStorage.setItem("auth", JSON.stringify(auth))

                return []
            })

export const signUpEpic = (action$: Object, deps: EpicDeps) =>
    action$.ofType(SIGNUP_REQUESTED)
        .mergeMap(() => {
            const { email, name } = getFormValues("login")(deps.getState())
            const headers = getHttpHeaders(deps.getState())
            if (!email) {
                throw new Error("Cannot get email from form")
            }
            const user: User = createUser(email, name || "")
            const userDTO = userToUserDTO(user)

            return Rx.Observable.from(registerUser(userDTO, headers))
                .map((receivedUserDTO: UserDTO) => createActionSignupSuccess(userDTOToUser(receivedUserDTO)))
                .catch((e) => {
                    return [stopSubmit("login"),
                        e.status === 400
                            ? createActionSignupErrorAlreadyExists()
                            : createActionSignupErrorGeneral()]
                })
        })

export const signUpSync = (action$: Object, deps: EpicDeps) =>
    action$.ofType(SIGNUP_SUCCESS)
        .map(({ payload: { user } }) => createActionUserUpdate(user))

export const loginAuthorizedDownloadData = (action$: Object, deps: EpicDeps) =>
    action$.ofType(LOGIN_AUTHORIZED)
        .map(() => createActionSyncStart())

export const signUpSuccessNotify = (action$: Object, deps: EpicDeps) =>
    action$.ofType(SIGNUP_SUCCESS)
        .map(({ payload: { user } }) => createActionShowSuccess("Successfully signed up, you can log in now."))

export default [
    logInEpic,
    loginAuthorizedSaveAuth(process.env.NODE_ENV === "test" ? {} : localStorage),
    loginAuthorizedDownloadData,
    signUpEpic,
    signUpSync,
    logInSubmit,
    signUpSuccessNotify,
]
