// @flow

import { assoc } from "ramda"
import type { NewChannel } from "../types"


export const createNewChannel = (name: string, creatorEmail: string): NewChannel => ({
    name: name,
    creatorEmail: creatorEmail,
    participators: assoc(
        creatorEmail,
        {
            email: creatorEmail,
            lastReadDate: null,
        },
        {},
    ),
})
