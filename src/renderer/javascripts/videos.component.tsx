import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/core"
import { remote } from "electron"
import humanizeDuration from "humanize-duration"
import React, { FunctionComponent, useState } from "react"
import { generateThumbnailAndVideoInfo } from "./generate-thumbnail-and-video-info"
import { OffScreen } from "./off-screen-area.component"
import { useVideos } from "./use-videos.hook"
import { Video } from "./video.interface"

const fs = window.require("electron").remote.require("fs")
const path = window.require("electron").remote.require("path")

const isFileOfFormat = (formats: string[]) => (filePath: string) => {
  return formats.some((format) => filePath.endsWith(format))
}

const isVideo = isFileOfFormat(["mp4"])

// TODO: messy shit. Split into paths creating fn and only then generate meta.
const generateFilesList = async (paths: string[]): Promise<Array<Video>> => {
  const info: Video[] = []
  for (const filePath of paths) {
    const stats = fs.lstatSync(filePath)
    if (stats.isDirectory()) {
      const dirFiles = fs.readdirSync(filePath)
      const files = dirFiles.map(
        (videoPath: string) => `${filePath}/${videoPath}`
      )
      const items = await generateFilesList(files)
      info.push(...items)
    } else if (isVideo(filePath)) {
      try {
        const file = fs.readFileSync(filePath)
        const fileInfo = await generateThumbnailAndVideoInfo(file)
        const pathInfo = splitPathIntoParts(filePath)
        info.push({
          file: pathInfo,
          ...fileInfo,
          title: pathInfo.name,
          favourite: false,
        })
      } catch {
        console.log("Something went wrong with file", filePath)
      }
    }
  }
  return info
}

const splitPathIntoParts = (filePath: string) => {
  return {
    name: path.basename(filePath).split(".").slice(0, -1).join("."),
    directory: path.dirname(filePath),
    extension: path.extname(filePath).replace(".", ""),
  }
}

const createFullFilePath = (file: Video["file"]): string => {
  return `${file.directory}/${file.name}.${file.extension}`
}

export const Videos: FunctionComponent = () => {
  const { videos, addVideos } = useVideos()
  const [currentVideoPath, setCurrentVideoPath] = useState("")
  const [loading, setLoading] = useState(false)

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
    const files = await generateFilesList(filePaths)
    await addVideos(files)
    setLoading(false)
  }

  const selectVideo = (path: string) => {
    const file = fs.readFileSync(path)
    setCurrentVideoPath(URL.createObjectURL(new Blob([file])))
  }

  return (
    <Stack height="100%">
      <Flex justifyContent="flex-end">
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
        <SimpleGrid minChildWidth="260px" spacing="20px">
          {videos.map((video) => {
            const { duration, thumbnails, file, title, favourite, _id } = video
            const fullFilePath = createFullFilePath(file)
            const playVideo = () => selectVideo(fullFilePath)
            return (
              <Box key={_id} p={4} borderWidth="1px" rounded="lg">
                <Image src={thumbnails[0]} alt="" />
                <Text mt={2} mb={2} fontWeight="bold" isTruncated>
                  {title}
                </Text>
                <Text>
                  {humanizeDuration(duration * 1000, { round: true })}
                </Text>
                <Flex justify="space-between">
                  <Button onClick={playVideo}>Play</Button>
                  <Tooltip
                    label={
                      favourite ? "Remove from favourites" : "Add to favourites"
                    }
                    placement="top"
                  >
                    <IconButton
                      aria-label={
                        favourite
                          ? "Remove from favourites"
                          : "Add to favourites"
                      }
                      icon={favourite ? "check" : "star"}
                      onClick={() => console.log("TODO: Set Favourite")}
                    />
                  </Tooltip>
                </Flex>
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
