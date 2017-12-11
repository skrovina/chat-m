// @flow

import { createHttpRequest } from "./createHttpRequest"
import { Config } from "../utils/Config"


const baseUrl: string = Config.SERVER_URL
const appId: string = Config.APP_ID

export const logIn = (email: string, headers: Object): Promise<string> =>
    createHttpRequest({
        method: "POST",
        url: baseUrl + "/auth",
        body: email,
        headers: headers,
    })

export const getAllUsers = (headers: Object): Promise<string> =>
    createHttpRequest({
        method: "GET",
        url: `${baseUrl}/${appId}/user`,
        headers: headers,
    })

