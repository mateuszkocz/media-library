import { File } from "../../foundation/interfaces/file.interface"

export interface Video {
  file: File
  title: string
  thumbnails: string[]
  duration: number
  favourite: boolean
}
