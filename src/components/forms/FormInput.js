// @flow

import React from "react"
import { FormControl } from "react-bootstrap"
import { formRenderer } from "./formRenderer"
import type { LabelFieldProps } from "./formRenderer"


export const FormInput = formRenderer(({ input }: LabelFieldProps) =>
    <FormControl {...input} type="text" />)
