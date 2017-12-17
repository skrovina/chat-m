// @flow

import React from "react"
import { Input } from "antd"
import { formRenderer } from "./formRenderer"
import type { LabelFieldProps } from "./formRenderer"


export const FormInput = formRenderer(({ input, placeholder, onPressEnter }: LabelFieldProps) => (
    <Input
        {...input}
        placeholder={placeholder}
        onPressEnter={onPressEnter}
        type="text" />
))