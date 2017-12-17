// @flow

import React from "react"
import { Form } from "antd"
//import type { FieldProps } from "redux-form"


export type LabelFieldProps = *// FieldProps & { label: string }

export const formRenderer = (render: *) => (props: LabelFieldProps) =>
    // let
    (({ input, meta, label }: LabelFieldProps = props,
      error = meta.error,
      touched = meta.touched,
      showError: boolean = touched && error,
      showSuccess: boolean = touched && !error,) => (
        // in
        <Form.Item
            label={label}
            validateStatus={showError ? "error" : (showSuccess ? "success" : null)}
            hasFeedback={Boolean(showError || showSuccess)}
            help={showError ? error : null}>
            {render(props)}
        </Form.Item>
    ))()
