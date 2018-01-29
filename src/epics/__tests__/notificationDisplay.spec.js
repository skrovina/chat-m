import { ActionsObservable } from "redux-observable"
import "rxjs"
import { marbles } from "rxjs-marbles"

import { createActionShowNotification } from "../../actions/notificationDisplay"
import { resetError } from "../notificationDisplay"


const epicDeps = {
    getState: () => ({}),
}

describe("resetError", () => {
    it("error state should be immediately reset", marbles((m) => {
        const notification = {
            type: "error",
            content: "OMG, there's an error!!",
        }
        const action$ = m.hot("-^-a-", {
            a: createActionShowNotification(notification),
        })
        const expected = m.hot("--b-", {
            b: createActionShowNotification(null),
        })
        
        const result = resetError(new ActionsObservable(action$), epicDeps)
        m.expect(result).toBeObservable(expected)
    }))
})
