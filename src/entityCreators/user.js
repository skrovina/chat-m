// @flow

import type { User } from "../types"


export const createUser = (email: string, name: string, image: ?string = null): User => ({
    email: email,
    name: name,
    image: image,
})
