import { Box, Button } from "@chakra-ui/core"
import { Router } from "@reach/router"
import React, { FunctionComponent } from "react"
import { Settings } from "./settings.component"
import { Videos } from "./videos.component"

const Main: FunctionComponent<{ path: string }> = () => {
  return <div>Main</div>
}

export const Content: FunctionComponent = () => {
  return (
    <Box as={Router} p="5" width="100%">
      <Main path="/" />
      <Videos path="/videos" />
      <Settings path="/settings" />
    </Box>
  )
}
