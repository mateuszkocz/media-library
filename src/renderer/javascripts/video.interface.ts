import { File } from "./file.interface"

export interface Video {
  file: File
  title: string
  thumbnails: string[]
  duration: number
  favourite: boolean
}
