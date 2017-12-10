// @flow
/* eslint-disable quote-props */

import { createSelector } from "reselect"
import { getAuth } from "./auth"
import type { Auth } from "../types"

export const getHttpHeaders = createSelector(
    getAuth,
    (auth: ?Auth) => ({
        "Content-Type": "application/json",
        ...(auth
            ? { "Authorization": "Bearer " + auth.token }
            : {}),
    }),
)
