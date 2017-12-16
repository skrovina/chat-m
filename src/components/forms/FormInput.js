// @flow

import React from "react"
import { FormControl } from "react-bootstrap"
import { formRenderer } from "./formRenderer"
import type { LabelFieldProps } from "./formRenderer"
import { Input } from "antd"


export const FormInput = formRenderer(({ input }: LabelFieldProps) =>
    <Input {...input} type="text" />)
