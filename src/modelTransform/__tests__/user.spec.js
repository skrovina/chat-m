import { userDTOToUser, userDTOToUserUpdateDTO, userToUserDTO } from "../user"
import { user, userDTO, userUpdateDTO } from "../../test/fixtures"


describe("userToUserDTO", () => {
    it("should convert correctly", () => {
        expect(userToUserDTO(user)).toEqual(userDTO)
    })
})

describe("userDTOToUser", () => {
    it("should convert correctly", () => {
        expect(userDTOToUser(userDTO)).toEqual(user)
    })
})

describe("userDTOToUserUpdateDTO", () => {
    it("should convert correctly", () => {
        expect(userDTOToUserUpdateDTO(userDTO)).toEqual(userUpdateDTO)
    })
})
