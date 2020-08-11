import styled from "@emotion/styled"
import React, { FunctionComponent } from "react"

const OffScreenRoot = styled.div`
  visibility: hidden;
`

export const OFF_SCREEN_AREA_ID = "off-screen-area"

/**
 * Component serves as a place to put all off screen data manipulation, like
 * rendering canvases and videos that are not meant to be visible or usable
 * by users.
 */
export const OffScreenArea: FunctionComponent = () => {
  return <OffScreenRoot id={OFF_SCREEN_AREA_ID} />
}
