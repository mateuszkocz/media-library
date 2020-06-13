import { Box } from "@chakra-ui/core"
import React, { FunctionComponent } from "react"
import { Settings } from "./settings.component"
import { Videos } from "./videos.component"
import { Router } from "@reach/router"

const Main: FunctionComponent<{ path: string }> = () => <div>Main</div>

export const Content: FunctionComponent = () => {
  return (
    <Box as={Router} p="5" width="100%">
      <Main path="/" />
      <Videos path="/videos" />
      <Settings path="/settings" />
    </Box>
  )
}
