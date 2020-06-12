import {
  Box,
  Button,
  Heading,
  Image,
  Spinner,
  Text,
  SimpleGrid,
  Stack,
  Flex,
} from "@chakra-ui/core"
import { remote } from "electron"
import React, { FunctionComponent, useState } from "react"
import { generateThumbnailAndVideoInfo } from "./generate-thumbnail-and-video-info"
import { OffScreen } from "./off-screen-area.component"

const fs = window.require("electron").remote.require("fs")

// TODO: name's stupid. Change it.
interface FileInfo {
  path: string
  thumbnail: string
  duration: number
}

const isFileOfFormat = (formats: string[]) => (filePath: string) =>
  formats.some((format) => filePath.endsWith(format))

const isVideo = isFileOfFormat(["mp4"])

// TODO: messy shit. Split into paths creating fn and only then generate meta.
const generateFilesList = async (paths: string[]): Promise<Array<FileInfo>> => {
  const info = []
  for (const path of paths) {
    const stats = fs.lstatSync(path)
    if (stats.isDirectory()) {
      const dirFiles = fs.readdirSync(path)
      const files = dirFiles.map((videoPath: string) => `${path}/${videoPath}`)
      const items = await generateFilesList(files)
      info.push(...items)
    } else if (isVideo(path)) {
      try {
        const file = fs.readFileSync(path)
        const fileInfo = await generateThumbnailAndVideoInfo(file)
        info.push({ path, ...fileInfo })
      } catch {
        console.log("Something went wrong with file", path)
      }
    }
  }
  return info
}

export const Videos: FunctionComponent = () => {
  const [currentVideoPath, setCurrentVideoPath] = useState("")
  const [loading, setLoading] = useState(false)
  const [videos, setVideosList] = useState<FileInfo[]>([])

  const empty = !videos.length
  const promptVisible = empty && !loading

  const openFiles = async () => {
    const result = await remote.dialog.showOpenDialog({
      properties: ["openFile", "multiSelections", "openDirectory"],
      filters: [
        {
          extensions: [".mp4"],
          name: "mp4",
        },
      ],
    })
    setLoading(true)
    const { filePaths } = result
    setVideosList(await generateFilesList(filePaths))
    setLoading(false)
  }

  return (
    <Stack height="100%">
      <Flex justifyContent="space-between">
        <Heading as="h1">Videos</Heading>
        <Button onClick={openFiles}>Add Videos</Button>
      </Flex>

      {loading && (
        <Flex height="100%" align="center" justify="center">
          <Spinner size="xl" />
        </Flex>
      )}

      {/* TODO: Move elsewhere. This is not a place for this component. */}
      {currentVideoPath && <video controls src={currentVideoPath} />}

      {!empty && (
        <SimpleGrid minChildWidth="120px" spacing="40px">
          {videos.map(({ path, duration, thumbnail }) => {
            const playVideo = () => setCurrentVideoPath(path)
            return (
              <Box key={path}>
                <Image src={thumbnail} alt="" />
                <Text>{path}</Text>
                <Text>duration: {duration / 60}</Text>
                <Button onClick={playVideo}>Play</Button>
              </Box>
            )
          })}
        </SimpleGrid>
      )}

      {promptVisible && (
        <Flex height="100%" justify="center" align="center">
          <Stack aria-labelledby="prompt action">
            <Text id="prompt" fontSize="xl">
              There are no videos on your list just yet
            </Text>
            <Button id="action" onClick={openFiles}>
              Add some
            </Button>
          </Stack>
        </Flex>
      )}
      <OffScreen />
    </Stack>
  )
}
