import { Box, Button, Flex, Link, Stack } from "@chakra-ui/core"
import { Link as ReachLink, Location } from "@reach/router"
import { AnimateSharedLayout, motion, useCycle } from "framer-motion"
import React, { FunctionComponent } from "react"

const Notifier = motion.custom(Box)

const notifierColor = {
  "/": "blue",
  "/music": "green",
  "/videos": "yellow",
  "/images": "red",
}

const menuItemsVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

const AnimatingLink = motion.custom(Link)

const MenuItem: FunctionComponent<{
  to: string
  active?: boolean
}> = ({ to, children, active = false, ...props }) => {
  return (
    <AnimatingLink
      {...props}
      as={ReachLink}
      to={to}
      bg="gray.100"
      p={2}
      textAlign="center"
      rounded="md"
      position={"relative"}
      variants={menuItemsVariants}
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
    </AnimatingLink>
  )
}

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
}

const MenuWrapper = motion.custom(Box)

const Background = motion.custom(Box)

const menuListVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const MenuStack = motion.custom(Stack)

export const MainMenu: FunctionComponent = () => {
  const [open, toggleOpen] = useCycle(false, true)
  return (
    <Location>
      {({ location: { pathname } }) => {
        return (
          <MenuWrapper
            position={"absolute"}
            top={"10px"}
            left={"10px"}
            initial={false}
            animate={open ? "open" : "closed"}
            variants={sidebar}
          >
            <Background
              variants={sidebar}
              bg={"hotpink"}
              position={"absolute"}
              top={0}
              bottom={0}
              left={0}
              width={"300px"}
            />
            <Button onClick={toggleOpen}>Menu</Button>
            <Stack minWidth="400px" p="3" position={"relative"} zIndex={"10"}>
              <Flex justify="space-between" direction="column" height="100%">
                <AnimateSharedLayout>
                  <MenuStack variants={menuListVariants}>
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
                  </MenuStack>
                </AnimateSharedLayout>
              </Flex>
            </Stack>
          </MenuWrapper>
        )
      }}
    </Location>
  )
}
