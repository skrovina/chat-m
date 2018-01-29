// @flow

import React from "react"
import FileBase64 from "react-file-base64"
import { formRenderer } from "./formRenderer"
import type { LabelFieldProps } from "./formRenderer"

export const FormFileInput = formRenderer(({ input, placeholder }: LabelFieldProps) => (

    <FileBase64
        multiple={false}
        onDone={(obj) => input.onChange(obj)} />
))
