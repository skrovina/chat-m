// @flow

import { uuid } from "../utils/uuidGenerator"
import type { Message } from "../types"
import { getIsoDate } from "../utils/clock"


export const createMessage = (value: string, byEmail: string): Message => ({
    id: uuid(),
    value: value,
    created: {
        at: getIsoDate(),
        by: byEmail,
    },
    updated: null,
    upvoteCount: 0,
})
