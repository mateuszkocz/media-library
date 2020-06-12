import {
  Button,
  Collapse,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/core"
import React, { FunctionComponent, useState } from "react"

export const MainMenu: FunctionComponent = () => {
  // FIXME: Obviously.
  const [allMenuVisible, setAllMenuVisibility] = useState(false)
  const [videosMenuVisible, setVideoMenuVisibility] = useState(false)
  const [musicMenuVisible, setMusicMenuVisibility] = useState(false)
  const [imagesMenuVisible, setImagesMenuVisibility] = useState(false)
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
            <Button onClick={() => setAllMenuVisibility(!allMenuVisible)}>
              Library
            </Button>
            <Collapse isOpen={allMenuVisible}>
              <Stack>
                <Button>All</Button>
                <Button>Favourites</Button>
                <Button>Highest score</Button>
                <Divider />
              </Stack>
            </Collapse>
          </Stack>
          <Stack>
            <Button onClick={() => setVideoMenuVisibility(!videosMenuVisible)}>
              Videos
            </Button>
            <Collapse isOpen={videosMenuVisible}>
              <Stack>
                <Button>All</Button>
                <Button>Favourites</Button>
                <Button>Highest score</Button>
                <Divider />
              </Stack>
            </Collapse>
          </Stack>

          <Stack>
            <Button onClick={() => setMusicMenuVisibility(!musicMenuVisible)}>
              Music
            </Button>
            <Collapse isOpen={musicMenuVisible}>
              <Stack>
                <Button>All</Button>
                <Button>Favourites</Button>
                <Button>Highest score</Button>
                <Divider />
              </Stack>
            </Collapse>
          </Stack>
          <Stack>
            <Button onClick={() => setImagesMenuVisibility(!imagesMenuVisible)}>
              Images
            </Button>
            <Collapse isOpen={imagesMenuVisible}>
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
