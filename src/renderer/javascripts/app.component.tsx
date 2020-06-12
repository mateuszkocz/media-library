import { CSSReset, ThemeProvider } from "@chakra-ui/core"
import { css, Global } from "@emotion/core"
import React, { FunctionComponent } from "react"
import { theme } from "./theme"
import { Videos } from "./videos.component"

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
      <Videos />
    </ThemeProvider>
  )
}
