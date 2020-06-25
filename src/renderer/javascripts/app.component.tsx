import { CSSReset, Box, Flex, ThemeProvider, Stack } from "@chakra-ui/core"
import { css, Global } from "@emotion/core"
import React, { FunctionComponent } from "react"
import { Content } from "./content.component"
import { getDatabase } from "./database"
import { DatabaseProvider } from "./database.provider"
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

const DragRegion = () => {
  return (
    <Box
      style={{ WebkitAppRegion: "drag" }}
      position={"fixed"}
      top={0}
      width={"50%"}
      left={"25%"}
      height={"10px"}
      bg={"gray.200"}
      roundedBottomLeft={"lg"}
      roundedBottomRight={"lg"}
    />
  )
}

const TopBar = () => {
  return (
    <Box
      style={{ WebkitAppRegion: "drag" }}
      height={"40px"}
      bg={"gray.300"}
      textAlign={"center"}
    >
      Top Bar
    </Box>
  )
}

export const App: FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <DatabaseProvider db={getDatabase()}>
        <CSSReset />
        <Global styles={globalCss} />
        <Stack>
          <TopBar />
          <Flex height="calc(100vh - 40px)" width="100vw" overflow={"scroll"}>
            <MainMenu />
            <Content />
          </Flex>
        </Stack>
      </DatabaseProvider>
    </ThemeProvider>
  )
}
