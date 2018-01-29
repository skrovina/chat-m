// @flow

import Rx from "rxjs"

import {
    DELETE_MESSAGE_POST_FAILURE,
    DELETE_MESSAGE_POST_SUCCESS,
    DELETE_MESSAGE_SUBMIT,
    EDIT_MESSAGE_POST_FAILURE,
    EDIT_MESSAGE_POST_SUCCESS,
    EDIT_MESSAGE_SUBMIT,
    MESSAGE_ADJUST_VOTES,
    MESSAGE_ADJUST_VOTES_FAILURE,
    MESSAGE_ADJUST_VOTES_SUCCESS,
    MESSAGE_COMPOSE_SEND,
    MESSAGE_COMPOSE_SEND_FAILURE,
    MESSAGE_COMPOSE_SENT,
} from "../actions/messages"
import {
    EDIT_PROFILE_POST,
    EDIT_PROFILE_POST_FAILURE,
    EDIT_PROFILE_POST_SUCCESS,
} from "../actions/profile"
import {
    ADD_CHANNEL_POST,
    ADD_CHANNEL_POST_FAILURE,
    ADD_CHANNEL_POST_SUCCESS,
} from "../actions/channels/addChannel"
import {
    DELETE_CHANNEL_POST,
    DELETE_CHANNEL_POST_FAILURE,
    DELETE_CHANNEL_POST_SUCCESS,
    INVITE_CHANNEL_POST,
    INVITE_CHANNEL_POST_FAILURE,
    INVITE_CHANNEL_POST_SUCCESS,
    RENAME_CHANNEL_POST,
    RENAME_CHANNEL_POST_FAILURE,
    RENAME_CHANNEL_POST_SUCCESS,
} from "../actions/channels/channels"
import {
    LOGIN_AUTHORIZED,
    LOGIN_ERROR_GENERAL,
    LOGIN_ERROR_NOT_REGISTERED,
    LOGIN_REQUESTED,
    SIGNUP_ERROR_ALREADY_EXISTS,
    SIGNUP_ERROR_GENERAL,
    SIGNUP_REQUESTED,
    SIGNUP_SUCCESS,
} from "../actions/login"
import { createActionLoadingEnded, createActionLoadingStarted } from "../actions/loading"

const startTypes = [
    LOGIN_REQUESTED,
    SIGNUP_REQUESTED,

    MESSAGE_COMPOSE_SEND,

    MESSAGE_ADJUST_VOTES,

    DELETE_MESSAGE_SUBMIT,

    EDIT_MESSAGE_SUBMIT,

    EDIT_PROFILE_POST,

    ADD_CHANNEL_POST,

    DELETE_CHANNEL_POST,

    INVITE_CHANNEL_POST,

    RENAME_CHANNEL_POST,
]

const endTypes = [
    LOGIN_ERROR_NOT_REGISTERED,
    LOGIN_ERROR_GENERAL,
    LOGIN_AUTHORIZED,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR_ALREADY_EXISTS,
    SIGNUP_ERROR_GENERAL,

    MESSAGE_COMPOSE_SENT,
    MESSAGE_COMPOSE_SEND_FAILURE,

    MESSAGE_ADJUST_VOTES_SUCCESS,
    MESSAGE_ADJUST_VOTES_FAILURE,

    DELETE_MESSAGE_POST_SUCCESS,
    DELETE_MESSAGE_POST_FAILURE,

    EDIT_MESSAGE_POST_SUCCESS,
    EDIT_MESSAGE_POST_FAILURE,

    EDIT_PROFILE_POST_SUCCESS,
    EDIT_PROFILE_POST_FAILURE,

    ADD_CHANNEL_POST_SUCCESS,
    ADD_CHANNEL_POST_FAILURE,

    DELETE_CHANNEL_POST_SUCCESS,
    DELETE_CHANNEL_POST_FAILURE,

    INVITE_CHANNEL_POST_SUCCESS,
    INVITE_CHANNEL_POST_FAILURE,

    RENAME_CHANNEL_POST_SUCCESS,
    RENAME_CHANNEL_POST_FAILURE,
]

const start = (action$: Object) =>
    Rx.Observable.merge(...startTypes.map(type => action$.ofType(type)))

const end = (action$: Object) =>
    Rx.Observable.merge(...endTypes.map(type => action$.ofType(type)))

export const isLoading = (
    startDelay: number = 1000,
    endDelay: number = 1000,
    debounceDelay: number = 200,
    scheduler: Rx.Scheduler = undefined
) =>
    (action$: Object) => {
        const makeSequenced = o => o.scan((acc, x) => acc + 1, 0).startWith(0)
        const sequencedStart = makeSequenced(start(action$))
        const sequencedEnd = makeSequenced(end(action$))

        return Rx.Observable.combineLatest(sequencedStart.delay(startDelay, scheduler), sequencedEnd)
            .map(([s, e]) => s > e)
            .distinctUntilChanged()
            .concatMap((loading) => (loading
                ? Rx.Observable.of(loading)
                : Rx.Observable.of(loading).delay(endDelay, scheduler)))
            .debounceTime(debounceDelay, scheduler)
            .map((loading) => (loading
                ? createActionLoadingStarted()
                : createActionLoadingEnded()))
    }

export default [
    isLoading(),
]
