// @flow

import { createHttpRequest } from "./createHttpRequest"
import { Config } from "../utils/Config"


const baseUrl: string = Config.SERVER_URL

export const logIn = (email: string, headers: Object): Promise<string> =>
    createHttpRequest({
        method: "POST",
        url: baseUrl + "/auth",
        body: email,
        headers: headers,
    })

