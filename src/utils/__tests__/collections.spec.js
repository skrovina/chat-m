import { fromAssoc, fromAssocTuples, toAssoc } from "../collections"

const createObj = (id) => ({
    base: {
        secondLevel: {
            id: id,
            prop1: id * 2,
            prop2: id * 3,
        },
        prop3: id * 4,
    },
})

const exampleArray = (() => {
    let array = []
    for (let i = 0; i < 15; i++) {
        array = [...array, createObj(i)]
    }
    return array
})()


describe("toAssoc", () => {
    it("should contain original objects", () => {
        const array = exampleArray

        array.forEach((obj, idx) =>
            expect(toAssoc(array, (o) => o.base.secondLevel.id)[`${idx}`]).toEqual(array[idx]))
    })
})

describe("fromAssoc", () => {
    it("should contain original objects", () => {
        const assocArray = {
            1: createObj(1),
            5: createObj(5),
            2: createObj(2),
        }

        const sorter = (a, b) => a.base.secondLevel.id > b.base.secondLevel.id

        const array = [createObj(5), createObj(2), createObj(1)]

        expect(fromAssoc(assocArray).sort(sorter)).toEqual(array.sort(sorter))
    })
})

describe("fromAssocTuples", () => {
    it("should contain original objects", () => {
        const assocArray = {
            1: createObj(1),
            5: createObj(5),
            2: createObj(2),
        }

        const sorter = ([_, a], [__, b]) => a.base.secondLevel.id > b.base.secondLevel.id

        const array = [["5", createObj(5)], ["2", createObj(2)], ["1", createObj(1)]]

        expect(fromAssocTuples(assocArray).sort(sorter)).toEqual(array.sort(sorter))
    })
})
