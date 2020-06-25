import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
} from "@chakra-ui/core"
import { Link as ReachLink, Location } from "@reach/router"
import { AnimateSharedLayout, motion } from "framer-motion"
import React, { FunctionComponent } from "react"

const Notifier = motion.custom(Box)

const notifierColor = {
  "/": "blue",
  "/music": "green",
  "/videos": "yellow",
  "/images": "red",
}

const MenuItem: FunctionComponent<{ to: string; active?: boolean }> = ({
  to,
  children,
  active = false,
  ...props
}) => {
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
          left={"-5px"}
          height={"100%"}
          width={"4px"}
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
          <Stack minWidth="400px" p="3" position={"relative"} zIndex={"10"}>
            <FormControl>
              <FormLabel htmlFor="search">Search</FormLabel>
              <Input
                type="search"
                id="search"
                placeholder="What you're looking for?"
              />
            </FormControl>
            <Divider />
            <Flex justify="space-between" direction="column" height="100%">
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
                </Stack>
              </AnimateSharedLayout>
              <Stack>
                <MenuItem to="/settings">Settings</MenuItem>
                <Button>Help</Button>
              </Stack>
            </Flex>
          </Stack>
        )
      }}
    </Location>
  )
}
