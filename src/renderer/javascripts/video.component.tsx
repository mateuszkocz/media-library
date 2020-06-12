import { Button, Heading, Image } from "@chakra-ui/core"
import { remote } from "electron"
import React, { FunctionComponent, useState } from "react"
import { generateThumbnailAndVideoInfo } from "./generate-thumbnail-and-video-info"
import { OffScreen } from "./off-screen-area.component"

const fs = window.require("electron").remote.require("fs")

export const Video: FunctionComponent = () => {
  const [filePath, setFilePath] = useState<string>()
  const [thumbnail, setThumbnail] = useState<string>()
  const [duration, setVideoDuration] = useState<number>()
  const openFiles = async () => {
    const { filePaths } = await remote.dialog.showOpenDialog({
      properties: ["openFile", "multiSelections", "openDirectory"],
    })
    if (filePaths.length) {
      const file = fs.readFileSync(filePaths[0])
      const { thumbnail, duration } = await generateThumbnailAndVideoInfo(file)
      setFilePath(filePaths[0])
      setThumbnail(thumbnail)
      setVideoDuration(duration)
    }
  }

  return (
    <section>
      <Heading as="h1">Video</Heading>
      {filePath && <video src={filePath} controls />}
      <Heading as="h2">Thumbnail</Heading>
      <Image src={thumbnail} alt=""/>
      <Heading as="h3">Meta</Heading>
      <p>Duration: {duration}</p>
      <p>File Path: {filePath}</p>
      <Button onClick={openFiles}>Open files</Button>
      <OffScreen />
    </section>
  )
}
