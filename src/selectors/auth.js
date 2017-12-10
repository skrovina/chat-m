// @flow

import type { StateObject } from "../reducers/app"
import type { Auth } from "../types"

export const getAuth = (state: StateObject): ?Auth => state.auth
