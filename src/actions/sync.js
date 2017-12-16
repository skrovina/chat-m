// @flow


export const SYNC_START = "sync/start"
export const createActionSyncStart = () => ({
    type: SYNC_START,
})

export const SYNC_FIRE = "sync/fire"
export const createActionSyncFire = () => ({
    type: SYNC_FIRE,
})

export const SYNC_STOP = "sync/stop"
export const createActionSyncStop = () => ({
    type: SYNC_STOP,
})
