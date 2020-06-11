import { CSSReset, Heading, ThemeProvider } from "@chakra-ui/core"
import styled from "@emotion/styled"
import * as React from "react"
import { color } from "styled-system"
import { theme } from "./theme"

const MyBox = styled("section")(
  color
)

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset/>
      <Heading as="h1">Hello World!</Heading>
      <MyBox color="green.100" bg="blue.300">Emotion styled</MyBox>
    </ThemeProvider>
  )
}
