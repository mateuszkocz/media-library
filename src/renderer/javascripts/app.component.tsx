import { CSSReset, Heading, ThemeProvider } from "@chakra-ui/core"
import styled from "@emotion/styled"
import { Global, css } from "@emotion/core"
import React from "react"
import { color } from "styled-system"
import { theme } from "./theme"

const MyBox = styled("section")(color)

const globalCss = css`
  html,
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    overflow: hidden;
  }

  body {
    font-family: -apple-system, "Helvetica Neue", Helvetica, sans-serif;
  }

  .message {
    position: absolute;
    width: 500px;
    height: 250px;
    top: 50%;
    left: 50%;
    color: #777;
    font-weight: 200;
    text-align: center;
    margin-top: -125px;
    margin-left: -250px;
  }

  .message h1 {
    font-size: 50px;
    font-weight: 100;
    color: #333;
  }

  .message div {
    margin-bottom: 10px;
  }
`

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Global styles={globalCss} />
      <Heading as="h1">Hello World!</Heading>
      <MyBox color="green.100" bg="blue.300">
        Emotion styled
      </MyBox>
    </ThemeProvider>
  )
}
