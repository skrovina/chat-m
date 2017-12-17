// @flow

import type { User, UserDTO, UserUpdateDTO } from "../types"
import { decodeCustomData, encodeCustomData } from "./coder"

export const userToUserDTO = ({ email, ...rest }: User): UserDTO => ({
    email: email,
    customData: encodeCustomData(rest),
})

export const userDTOToUser = ({ email, customData }: UserDTO): User =>
    // let
    (({ name = "", image = null } = decodeCustomData(customData)) =>
        // in
        ({
            email: email,
            name: name,
            image: image,
        })
    )()

export const userDTOToUserUpdateDTO = ({ email, customData }: UserDTO): UserUpdateDTO => customData
