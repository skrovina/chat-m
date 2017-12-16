// @flow

import type { Message, MessageDTO } from "../types"
import { decodeCustomData, encodeCustomData } from "./coder"

export const messageToMessageDTO =
    ({
        id,
        value,
        created,
        updated,
        ...rest
    }: Message): MessageDTO => ({
        id: id,
        value: value,
        createdAt: created.at,
        createdBy: created.by,
        updatedAt: (updated && updated.at) || "",
        updatedBy: (updated && updated.by) || "",
        customData: encodeCustomData(rest),
    })

export const messageDTOToMessage =
    ({
        id,
        value,
        createdAt,
        createdBy,
        updatedAt,
        updatedBy,
        customData,
    }: MessageDTO): Message =>
        // let
        (({ upvoteCount = 0 } = decodeCustomData(customData)) =>
            ({
                id: id,
                value: value,
                created: {
                    at: createdAt,
                    by: createdBy,
                },
                updated: updatedAt && updatedBy
                    ? {
                        at: updatedAt,
                        by: updatedBy,
                    }
                    : null,
                upvoteCount: upvoteCount,
            }))()
