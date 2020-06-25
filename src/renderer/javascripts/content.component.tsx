import { Box, Heading } from "@chakra-ui/core"
import { Router, Location } from "@reach/router"
import React, { FunctionComponent } from "react"
import { Settings } from "./settings.component"
import { Videos } from "./videos.component"
import { AnimatePresence, motion } from "framer-motion"

const FramerRouter: FunctionComponent = ({ children }) => (
  <Location>
    {({ location }) => (
      <Box p="5" width="100%" position="relative" ml={"400px"}>
        <AnimatePresence initial={false}>
          <Router key={location.key} location={location}>
            {children}
          </Router>
        </AnimatePresence>
      </Box>
    )}
  </Location>
)

const PageContainer = motion.custom(Box)

const Page: FunctionComponent = ({ children }) => {
  return (
    <PageContainer
      height={"80vh"}
      width={"100%"}
      initial={{ x: "100%", opacity: 1, position: "absolute" }}
      animate={{ x: 0, opacity: 1, position: "relative" }}
      exit={{ x: "-100%", opacity: 0, position: "absolute" }}
    >
      {children}
    </PageContainer>
  )
}

const MainPage: FunctionComponent<{ path: string }> = () => {
  return (
    <Page>
      <Heading h={1}>All</Heading>
    </Page>
  )
}

const ImagesPage: FunctionComponent<{ path: string }> = () => {
  return (
    <Page>
      <Heading h={1}>Images</Heading>
    </Page>
  )
}

const VideosPage: FunctionComponent<{ path: string }> = () => {
  return (
    <Page>
      <Videos />
    </Page>
  )
}

const MusicPage: FunctionComponent<{ path: string }> = () => {
  return (
    <Page>
      <Heading h={1}>Music</Heading>
    </Page>
  )
}

export const Content: FunctionComponent = () => {
  return (
    <FramerRouter>
      <MainPage path="/" />
      <VideosPage path="/videos" />
      <Settings path="/settings" />
      <ImagesPage path="/images" />
      <MusicPage path="/music" />
    </FramerRouter>
  )
}
