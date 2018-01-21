import { decodeCustomData, encodeCustomData } from "../coder"

const customData = { prop1: "string", prop2: 5 }
const encodedCustomData = "{\"prop1\":\"string\",\"prop2\":5}"

describe("encodeCustomData", () => {
    it("should encode custom data correctly", () => {
        expect(encodeCustomData(customData)).toEqual(encodedCustomData)
    })
})

describe("decodeCustomData", () => {
    it("should decode custom data correctly", () => {
        expect(decodeCustomData(encodedCustomData)).toEqual(customData)
    })

    it("should return empty obj. if data is null", () => {
        expect(decodeCustomData(null)).toEqual({})
    })
    it("should return empty obj. if data is unparsable", () => {
        expect(decodeCustomData("invalid json")).toEqual({})
    })
})
