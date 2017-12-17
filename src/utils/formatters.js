// @flow

import { format } from "date-fns"


export const formatDateTime = (date: Date | string): string => format(date, "D.M.YYYY, H:mm")
