/* eslint-disable function-paren-newline */
// @flow

import Rx from "rxjs"
import { createActionShowError } from "../actions/notificationDisplay"
import {
    LOGIN_ERROR_GENERAL,
    LOGIN_ERROR_NOT_REGISTERED,
    SIGNUP_ERROR_ALREADY_EXISTS,
    SIGNUP_ERROR_GENERAL,
} from "../actions/login"
import { EDIT_PROFILE_POST_FAILURE } from "../actions/profile"
import {
    DELETE_CHANNEL_POST_FAILURE,
    INVITE_CHANNEL_POST_FAILURE,
    RENAME_CHANNEL_POST_FAILURE,
} from "../actions/channels/channels"
import {
    DELETE_MESSAGE_POST_FAILURE,
    EDIT_MESSAGE_POST_FAILURE,
    MESSAGE_ADJUST_VOTES_FAILURE,
    MESSAGE_COMPOSE_SEND_FAILURE,
} from "../actions/messages"
import { ADD_CHANNEL_POST_FAILURE } from "../actions/channels/addChannel"


export const showError = (action$: Object) =>
    Rx.Observable.merge(
        action$.ofType(LOGIN_ERROR_NOT_REGISTERED)
            .mapTo(createActionShowError("User with email is not registered")),
        action$.ofType(LOGIN_ERROR_GENERAL)
            .mapTo(createActionShowError("Unknown Login Error")),

        action$.ofType(SIGNUP_ERROR_ALREADY_EXISTS)
            .mapTo(createActionShowError("Email already used, please log in.")),
        action$.ofType(SIGNUP_ERROR_GENERAL)
            .mapTo(createActionShowError("Unknown Signup Error")),

        action$.ofType(EDIT_PROFILE_POST_FAILURE)
            .mapTo(createActionShowError("Updating user profile failed.")),
        action$.ofType(RENAME_CHANNEL_POST_FAILURE)
            .mapTo(createActionShowError("Renaming channel failed")),
        action$.ofType(INVITE_CHANNEL_POST_FAILURE)
            .mapTo(createActionShowError("Inviting to channel failed")),
        action$.ofType(DELETE_CHANNEL_POST_FAILURE)
            .mapTo(createActionShowError("Deleting channel failed.")),

        action$.ofType(ADD_CHANNEL_POST_FAILURE)
            .mapTo(createActionShowError("Adding channel failed.")),
        action$.ofType(MESSAGE_COMPOSE_SEND_FAILURE)
            .mapTo(createActionShowError("Sending message failed.")),
        action$.ofType(MESSAGE_ADJUST_VOTES_FAILURE)
            .mapTo(createActionShowError("Adjusting votes failed.")),
        action$.ofType(EDIT_MESSAGE_POST_FAILURE)
            .mapTo(createActionShowError("Editing message failed.")),
        action$.ofType(DELETE_MESSAGE_POST_FAILURE)
            .mapTo(createActionShowError("Deleting message failed.")),
    )


export default [
    showError,
]
