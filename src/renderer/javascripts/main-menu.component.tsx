import {
  Button,
  Collapse,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/core"
import React, { FunctionComponent } from "react"

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
                <Button>All</Button>
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
                <Button>All</Button>
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
                <Button>All</Button>
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
                <Button>All</Button>
                <Button>Favourites</Button>
                <Button>Highest score</Button>
                <Divider />
              </Stack>
            </Collapse>
          </Stack>
        </Stack>
        <Stack>
          <Button>Settings</Button>
          <Button>Help</Button>
        </Stack>
      </Flex>
    </Stack>
  )
}
