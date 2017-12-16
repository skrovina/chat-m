// @flow

import { Logger } from "../utils/logger"

export const encodeCustomData = (props: Object): string => JSON.stringify(props)

export const decodeCustomData = (customData: string): any => {
    if (!customData) {
        return {}
    }

    try {
        return JSON.parse(customData)
    }
    catch (e) {
        Logger.error("Could not parse customData string", customData)
        return {}
    }
}
