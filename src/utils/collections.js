// @flow

import { assoc } from "ramda"

export const toAssoc = <T>(array: T[], sel: T => string): { [key: string]: T } =>
    array.reduce((acc, obj) => assoc(sel(obj), obj, acc), {})

export const fromAssoc = <T>(assocArray: { [key: string]: T }): T[] =>
    // $FlowFixMe
    Object.values(assocArray)
