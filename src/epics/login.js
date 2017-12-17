// @flow

import Rx from "rxjs"
import { getFormValues } from "redux-form"
import type { EpicDeps } from "../utils/configureEpics"
import {
    createActionLoginAuthorized, createActionSignupSuccess, LOGIN_AUTHORIZED, LOGIN_REQUESTED,
    SIGNUP_REQUESTED, SIGNUP_SUCCESS,
} from "../actions/login"
import { logIn, registerUser } from "../api/httpRequests"
import { getHttpHeaders } from "../selectors/httpHeaders"
import { createActionSyncStart } from "../actions/sync"
import type { User, UserDTO } from "../types"
import { userDTOToUser, userToUserDTO } from "../modelTransform/user"
import { createActionUserUpdate } from "../actions/users"
import { createUser } from "../entityCreators/user"


const logInEpic = (action$: Object, deps: EpicDeps) =>
    action$.ofType(LOGIN_REQUESTED)
        .switchMap(() => {
            const { email } = getFormValues("login")(deps.getState())
            const headers = getHttpHeaders(deps.getState())
            if (!email) {
                throw new Error("Cannot get email from form")
            }

            return Rx.Observable.from(logIn(email, headers))
                .map((token) => [token, email])
        })
        .map(([token, email]) => createActionLoginAuthorized({ token: token, email: email }))
        .catch((e) => {
            console.log(e)
            return []
        })

const loginAuthorizedSaveAuth = (action$: Object, deps: EpicDeps) =>
    action$.ofType(LOGIN_AUTHORIZED)
        .switchMap((action) => {
            const { payload: { auth } } = action
            localStorage.setItem("auth", JSON.stringify(auth))

            return []
        })

const signUpEpic = (action$: Object, deps: EpicDeps) =>
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
        })
        .map((user: UserDTO) => createActionSignupSuccess(userDTOToUser(user)))
        .catch((e) => {
            console.log(e)
            return []
        })

const signUpSync = (action$: Object, deps: EpicDeps) =>
    action$.ofType(SIGNUP_SUCCESS)
        .map(({ payload: { user } }) => createActionUserUpdate(user))

const loginAuthorizedDownloadData = (action$: Object, deps: EpicDeps) =>
    action$.ofType(LOGIN_AUTHORIZED)
        .map(() => createActionSyncStart())


export default [
    logInEpic,
    loginAuthorizedSaveAuth,
    loginAuthorizedDownloadData,
    signUpEpic,
    signUpSync,
]
