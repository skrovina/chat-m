import { toAssoc } from "../collections"

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
