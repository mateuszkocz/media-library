import {
  Box,
  Flex,
  FormLabel,
  Heading,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/core"
import React, { FunctionComponent } from "react"

export const Settings: FunctionComponent<{ path: string }> = () => {
  return (
    <Stack>
      <Heading>Settings</Heading>
      <Box p={4} borderWidth="1px" rounded="lg">
        <Flex justify="space-between" align="center">
          <FormLabel htmlFor="autoplay">Autoplay</FormLabel>
          <Switch id="autoplay" />
        </Flex>
        <Text fontSize={"s"}>
          Play videos and music automatically after selecting it.
        </Text>
      </Box>
      <Box p={4} borderWidth="1px" rounded="lg">
        <Flex justify="space-between" align="center">
          <FormLabel htmlFor="dance">Make the application dance</FormLabel>
          <Switch id="dance" />
        </Flex>
        <Text fontSize={"s"}>When you feel like dancing.</Text>
      </Box>
    </Stack>
  )
}
