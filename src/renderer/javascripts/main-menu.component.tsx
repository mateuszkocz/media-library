import { Box, Flex, Link, Stack } from "@chakra-ui/core"
import { Link as ReachLink, Location } from "@reach/router"
import { AnimateSharedLayout, motion } from "framer-motion"
import React, { FunctionComponent } from "react"

const notifierColor = {
  "/": "blue",
  "/music": "green",
  "/videos": "yellow",
  "/images": "red",
}

const Notifier = motion.custom(Box)

const MenuItem: FunctionComponent<{
  to: keyof typeof notifierColor
  active?: boolean
}> = ({ to, children, active = false, ...props }) => {
  return (
    <Link
      {...props}
      as={ReachLink}
      to={to}
      bg="gray.100"
      p={2}
      textAlign="center"
      rounded="md"
      position={"relative"}
    >
      {children}
      {active && (
        <Notifier
          layoutId="moniker"
          position={"absolute"}
          top={0}
          right={"calc(100% + 10px)"}
          height={"100%"}
          width={"20px"}
          background={notifierColor[to]}
          rounded="md"
        />
      )}
    </Link>
  )
}

export const MainMenu: FunctionComponent = () => {
  return (
    <Location>
      {({ location: { pathname } }) => {
        return (
          <Box
            height={"100%"}
            minWidth="300px"
            p="3"
            pl={"10"}
            position={"relative"}
            zIndex={"10"}
            borderRightColor={"grey.300"}
            borderRightStyle={"solid"}
            borderRightWidth={"1px"}
            background={"white"}
          >
            <AnimateSharedLayout>
              <Stack>
                <MenuItem to="/" active={pathname === "/"}>
                  All
                </MenuItem>
                <MenuItem to="/videos" active={pathname === "/videos"}>
                  Videos
                </MenuItem>
                <MenuItem to="/music" active={pathname === "/music"}>
                  Music
                </MenuItem>
                <MenuItem to="/images" active={pathname === "/images"}>
                  Images
                </MenuItem>
                <MenuItem to="/settings">Settings</MenuItem>
              </Stack>
            </AnimateSharedLayout>
          </Box>
        )
      }}
    </Location>
  )
}
