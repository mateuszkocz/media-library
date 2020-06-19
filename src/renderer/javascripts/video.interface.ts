// TODO: name's stupid. Change it.
export interface Video {
  file: {
    directory: string
    name: string
    extension: string
  }
  title: string
  thumbnails: string[]
  duration: number
}
