import { Box } from "@chakra-ui/core"
import React, { FunctionComponent } from "react"
import { Videos } from "./videos.component"

export const Content: FunctionComponent = () => {
  return (
    <Box p="5" width="100%">
      <Videos />
    </Box>
  )
}
