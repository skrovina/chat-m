// @flow

import { Logger } from "../utils/Logger"

const logHttpRequests = true

type HttpRequestType = {|
    method: string,
    url: string,
    headers: Object,
    body?: any,
|}

export const createHttpRequest = (data: HttpRequestType): Promise<any> => {
    const options = {
        method: data.method,
        headers: data.headers,
        body: data.body === null ? undefined : JSON.stringify(data.body),
        timeout: 30 * 1000,
    }

    if (logHttpRequests) {
        console.log(`URL: ${data.url}\n`
            + `METHOD: ${options.method}\n`
            + `HEADERS: ${JSON.stringify(options.headers, null, 2)}\n`
            + `BODY: ${JSON.stringify(options.body, null, 2)}`)
    }

    const { url } = data
    return fetch(url, options)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                if (response.headers.get("content-length") === "0") {
                    return Promise.resolve()
                }
                return Promise.resolve()
                    .then(() => {
                        const contentType = response.headers.get("content-type")
                        if (contentType && contentType.includes("json")) {
                            return response.json()
                        }
                        else {
                            return response.text()
                        }
                    })
                    .then(json => {
                        if (logHttpRequests) {
                            console.log(json)
                        }
                        return json
                    })
            }
            else {
                return Promise.resolve()
                    .then(() => {
                        const contentType = response.headers.get("content-type")
                        if (contentType && contentType.includes("json")) {
                            return response.json()
                        }
                        else {
                            return response.text()
                        }
                    })
                    .then(body => {
                        const error = {
                            status: response.status,
                            body: body,
                        }
                        return Promise.reject(error)
                    })
            }
        })
        .catch(error => {
            if (error.status) {
                Logger.warning(
                    "HTTP Request warning, " +
                    "Status: " + error.status + ", " +
                    "Method: " + data.method + ", " +
                    "URL: " + url, error)
            }
            else {
                Logger.warning(
                    "HTTP Request timeout, " +
                    "Method: " + data.method + ", " +
                    "URL: " + url)
            }
            return Promise.reject(error)
        })
}
