// @flow

import EnvConfig from "../env.json"


export type ConfigType = {|
    SERVER_URL: string,
    APP_ID: string,
|}

export const Config: ConfigType = {
    SERVER_URL: EnvConfig.SERVER_URL,
    APP_ID: EnvConfig.APP_ID,
}
