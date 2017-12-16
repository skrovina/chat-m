// @flow

import type { StateObject } from "../reducers/app"
import type { Auth } from "../types"
import { getAuth } from "./auth"

export const getSignedInUserEmail = (state: StateObject): ?string =>
    // let
    ((auth = getAuth(state)) =>
        // in
        (auth ? auth.email : null)
    )()
