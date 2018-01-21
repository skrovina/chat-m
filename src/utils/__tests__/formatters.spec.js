import { formatDateTime } from "../formatters"

describe("formatDateTime", () => {
    it("should format date time correctly", () => {
        expect(formatDateTime("2018-01-21T15:24:48.345Z")).toMatchSnapshot()
    })
})
