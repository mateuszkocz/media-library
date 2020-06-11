import { CSSReset, ThemeProvider } from "@chakra-ui/core"
import { Heading } from "@chakra-ui/core";
import * as React from 'react';
import { theme } from "./theme"

export function App () {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Heading as="h1">Hello World!</Heading>
    </ThemeProvider>
  )
}
