import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
} from "@chakra-ui/core"
import { Link as ReachLink } from "@reach/router"
import React, { FunctionComponent } from "react"

const MenuItem: FunctionComponent<{ to: string }> = ({
  to,
  children,
  ...props
}) => (
  <Link
    {...props}
    as={ReachLink}
    to={to}
    bg="gray.100"
    p={2}
    textAlign="center"
    rounded="md"
  >
    {children}
  </Link>
)

export const MainMenu: FunctionComponent = () => {
  return (
    <Stack minWidth="400px" p="3">
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
        <Stack>
          <MenuItem to="/">All</MenuItem>
          <MenuItem to="/videos">Videos</MenuItem>
          <MenuItem to="/music">Music</MenuItem>
          <MenuItem to="/images">Images</MenuItem>
        </Stack>
        <Stack>
          <MenuItem to="/settings">Settings</MenuItem>
          <Button>Help</Button>
        </Stack>
      </Flex>
    </Stack>
  )
}
