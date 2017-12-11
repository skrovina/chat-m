// @flow

import React from "react"
import { ControlLabel, FormGroup, FormControl, HelpBlock } from "react-bootstrap"
//import type { FieldProps } from "redux-form"


export type LabelFieldProps = *// FieldProps & { label: string }

export const formRenderer = (render: *) => (props: LabelFieldProps) =>
    // let
    (({ input, meta, label }: LabelFieldProps = props,
      error = meta.error,
      touched = meta.touched,
      showError: boolean = touched && error) => (
        // in
        <FormGroup validationState={showError ? "error" : null}>
            <ControlLabel>{label}</ControlLabel>
            {render(props)}
            <FormControl.Feedback />
            {showError && <HelpBlock>{error}</HelpBlock>}
        </FormGroup>
    ))()
