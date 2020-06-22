import {
  Button,
  Collapse,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  useDisclosure,
} from "@chakra-ui/core"
import React, { FunctionComponent } from "react"
import { Link as ReachLink } from "@reach/router"

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
  const { isOpen: libraryVisible, onToggle: toggleLibrary } = useDisclosure()
  const { isOpen: videosVisible, onToggle: toggleVideos } = useDisclosure()
  const { isOpen: musicVisible, onToggle: toggleMusic } = useDisclosure()
  const { isOpen: imagesVisible, onToggle: toggleImages } = useDisclosure()
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
          <Stack>
            <Button onClick={toggleLibrary}>Library</Button>
            <Collapse isOpen={libraryVisible}>
              <Stack>
                <MenuItem to="/">All</MenuItem>
                <Button>Favourites</Button>
                <Button>Highest score</Button>
                <Divider />
              </Stack>
            </Collapse>
          </Stack>
          <Stack>
            <Button onClick={toggleVideos}>Videos</Button>
            <Collapse isOpen={videosVisible}>
              <Stack>
                <MenuItem to="/videos">All</MenuItem>
                <Button>Favourites</Button>
                <Button>Highest score</Button>
                <Divider />
              </Stack>
            </Collapse>
          </Stack>

          <Stack>
            <Button onClick={toggleMusic}>Music</Button>
            <Collapse isOpen={musicVisible}>
              <Stack>
                <MenuItem to="/music">All</MenuItem>
                <Button>Favourites</Button>
                <Button>Highest score</Button>
                <Divider />
              </Stack>
            </Collapse>
          </Stack>
          <Stack>
            <Button onClick={toggleImages}>Images</Button>
            <Collapse isOpen={imagesVisible}>
              <Stack>
                <MenuItem to="/images">All</MenuItem>
                <Button>Favourites</Button>
                <Button>Highest score</Button>
                <Divider />
              </Stack>
            </Collapse>
          </Stack>
        </Stack>
        <Stack>
          <MenuItem to="/settings">Settings</MenuItem>
          <Button>Help</Button>
        </Stack>
      </Flex>
    </Stack>
  )
}
