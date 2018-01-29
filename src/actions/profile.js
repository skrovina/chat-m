// @flow

import type { User, UserDTO } from "../types"

export const EDIT_PROFILE_SUBMIT = "editProfile/submit"
export const createActionEditProfileSubmit = () => ({
    type: EDIT_PROFILE_SUBMIT,
})

export const EDIT_PROFILE_POST = "editProfile/post"
export const createActionEditProfilePost = (user: User) => ({
    type: EDIT_PROFILE_POST,
    payload: {
        user: user,
    },
})

export const EDIT_PROFILE_POST_SUCCESS = "editProfile/post/success"
export const createActionEditProfilePostSuccess = (user: UserDTO) => ({
    type: EDIT_PROFILE_POST_SUCCESS,
    payload: {
        user: user,
    },
})

export const EDIT_PROFILE_POST_FAILURE = "editProfile/post/failure"
export const createActionEditProfilePostFailure = () => ({
    type: EDIT_PROFILE_POST_FAILURE,
})
