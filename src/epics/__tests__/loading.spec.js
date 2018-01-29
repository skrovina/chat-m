import { ActionsObservable } from "redux-observable"
import "rxjs"
import { marbles } from "rxjs-marbles"

import * as E from "../loading"
import { createActionMessageAdjustVotes, createActionMessageAdjustVotesFailure } from "../../actions/messages"
import { createActionLoadingEnded, createActionLoadingStarted } from "../../actions/loading"


describe("isLoading", () => {
    it("should delay start by start delay + debounce", marbles((m) => {
        const action$ = m.hot("-^-a-------------", {
            a: createActionMessageAdjustVotes(),
            b: createActionMessageAdjustVotesFailure(),
        })
        const expected = m.hot("------c---------", {
            c: createActionLoadingStarted(),
            d: createActionLoadingEnded(),
        })

        const epic = E.isLoading(m.time("---|"), m.time("--|"), m.time("-|"), m.scheduler)
        const result = epic(new ActionsObservable(action$, {}))
        m.expect(result).toBeObservable(expected)
    }))
    it("should end loading if delay is not fulfilled", marbles((m) => {
        const action$ = m.hot("-^-a-b-----------", {
            a: createActionMessageAdjustVotes(),
            b: createActionMessageAdjustVotesFailure(),
        })
        const expected = m.hot("------d----------", {
            c: createActionLoadingStarted(),
            d: createActionLoadingEnded(),
        })

        const epic = E.isLoading(m.time("---|"), m.time("--|"), m.time("-|"), m.scheduler)
        const result = epic(new ActionsObservable(action$), {})
        m.expect(result).toBeObservable(expected)
    }))
    it("should work in complex case", marbles((m) => {
        const action$ = m.hot("-^-ab---a----b---ab---a-b-----a--b-----a---b--------a--------b-----", {
            a: createActionMessageAdjustVotes(),
            b: createActionMessageAdjustVotesFailure(),
        })
        const expected = m.hot("------d----c---d--------------------------c--d---------c-------d--", {
            c: createActionLoadingStarted(),
            d: createActionLoadingEnded(),
        })

        const epic = E.isLoading(m.time("---|"), m.time("--|"), m.time("-|"), m.scheduler)
        const result = epic(new ActionsObservable(action$), {})
        m.expect(result).toBeObservable(expected)
    }))
})
