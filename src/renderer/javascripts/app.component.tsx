import { CSSReset, Flex, ThemeProvider } from "@chakra-ui/core"
import { css, Global } from "@emotion/core"
import React, { FunctionComponent } from "react"
import { Content } from "./content.component"
import { MainMenu } from "./main-menu.component"
import { theme } from "./theme"

const globalCss = css`
  html,
  body {
    padding: 0;
    margin: 0;
    min-height: 100%;
  }

  body {
    font-family: -apple-system, "Helvetica Neue", Helvetica, sans-serif;
  }
`

export const App: FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Global styles={globalCss} />
      <Flex height="100vh" width="100vw">
        <MainMenu />
        <Content />
      </Flex>
    </ThemeProvider>
  )
}
