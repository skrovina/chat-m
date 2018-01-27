// @flow

import Rx from "rxjs"
import { getFormValues } from "redux-form"
import {
    createActionEditProfilePost,
    createActionEditProfilePostSuccess,
    EDIT_PROFILE_POST,
    EDIT_PROFILE_POST_SUCCESS,
    EDIT_PROFILE_SUBMIT,
} from "../actions/profile"
import { updateUserProfile } from "../utils/entityFunctions"
import { getSignedUser } from "../selectors/users"
import type { EpicDeps } from "../utils/configureEpics"
import { createActionModalDismiss } from "../actions/channels/addChannel"
import { userDTOToUser, userDTOToUserUpdateDTO, userToUserDTO } from "../modelTransform/user"
import { createActionUserUpdate } from "../actions/users"
import { getHttpHeaders } from "../selectors/httpHeaders"
import type { User, UserDTO } from "../types"
import { updateUser } from "../api/httpRequests"


export const submit = (action$: Object, deps: EpicDeps) =>
    action$.ofType(EDIT_PROFILE_SUBMIT)
        .map(() => {
            const { name, avatar } = getFormValues("edit-profile")(deps.getState())
            const base64 = avatar && avatar.base64

            const user = getSignedUser(deps.getState())
            if (!user) {
                throw new Error("No signed in user!")
            }

            const updated = updateUserProfile(user, name, base64)

            return createActionEditProfilePost(updated)
        })

export const post = (action$: Object, deps: EpicDeps) =>
    action$.ofType(EDIT_PROFILE_POST)
        .concatMap((action) => {
            const headers = getHttpHeaders(deps.getState())
            const user: User = action.payload.user
            const userUpdateDTO = userDTOToUserUpdateDTO(userToUserDTO(user))

            return Rx.Observable.from(updateUser(user.email, userUpdateDTO, headers))
        })
        .map((user: UserDTO) =>
            createActionEditProfilePostSuccess(user))
        .catch((e) => {
            console.log(e)
            return []
        })

export const postSuccessSync = (action$: Object, deps: EpicDeps) =>
    action$.ofType(EDIT_PROFILE_POST_SUCCESS)
        .map((action) => {
            const user: User = userDTOToUser(action.payload.user)

            return createActionUserUpdate(user)
        })

export const postSuccessCloseModal = (action$: Object, deps: EpicDeps) =>
    action$.ofType(EDIT_PROFILE_POST_SUCCESS)
        .map((action) => createActionModalDismiss())


export default [
    submit,
    post,
    postSuccessSync,
    postSuccessCloseModal,
]
