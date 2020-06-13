import {
  Box,
  Flex,
  FormLabel,
  Heading,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/core"
import Store from "electron-store"
import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react"

const settingsStore = new Store({
  name: "settings",
  schema: {
    autoplay: {
      type: "boolean",
      default: false,
    },
    dance: {
      type: "boolean",
      default: true,
    },
  },
})

const useStore = () => {
  const [, render] = useState()
  useEffect(() => settingsStore.onDidAnyChange(render), [])
  return settingsStore
}

export const Settings: FunctionComponent<{ path: string }> = () => {
  const store = useStore()
  return (
    <Stack>
      <Heading>Settings</Heading>
      <Box p={4} borderWidth="1px" rounded="lg">
        <Flex justify="space-between" align="center">
          <FormLabel htmlFor="autoplay">Autoplay</FormLabel>
          <Switch
            id="autoplay"
            isChecked={store.get("autoplay") as boolean}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              store.set("autoplay", event.target.checked)
            }
          />
        </Flex>
        <Text fontSize={"s"}>
          Play videos and music automatically after selecting it.
        </Text>
      </Box>
      <Box p={4} borderWidth="1px" rounded="lg">
        <Flex justify="space-between" align="center">
          <FormLabel htmlFor="dance">Make the application dance</FormLabel>
          <Switch
            id="dance"
            isChecked={store.get("dance") as boolean}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              store.set("dance", event.target.checked)
            }
          />
        </Flex>
        <Text fontSize={"s"}>When you feel like dancing.</Text>
      </Box>
    </Stack>
  )
}
