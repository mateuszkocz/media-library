import { OFF_SCREEN_AREA_ID } from "./off-screen-area.component"

export const generateThumbnailAndVideoInfo = (
  fileBuffer: Buffer
): Promise<{ thumbnail: string; duration: number }> => {
  return new Promise((resolve) => {
    // TODO: need to automatically set the height to make sure the proportions are preserved.
    const width = 300
    const height = 300

    const techArea = document.getElementById(OFF_SCREEN_AREA_ID)!
    const video = document.createElement("video")
    techArea.appendChild(video)
    video.width = width
    video.height = height
    video.src = URL.createObjectURL(new Blob([fileBuffer]))
    video.addEventListener("loadeddata", async () => {
      // TODO: investigate why it needs to wait. Generates black images without.
      await new Promise((resolve) => setTimeout(resolve, 100))
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      canvas
        .getContext("2d")!
        .drawImage(video, 0, 0, canvas.width, canvas.height)
      const dataUrl = canvas.toDataURL("image/png")
      const duration = video.duration
      video.remove()
      resolve({ thumbnail: dataUrl, duration })
    })
  })
}
