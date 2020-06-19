import { useContext, useEffect, useState } from "react"
import { Subscription } from "rxjs"
import { DatabaseContext } from "./database.context"
import { Video } from "./video.interface"

type WithId<T> = T & { _id: string }

interface UseVideos {
  videos: Array<WithId<Video>>
  addVideo: (video: Video) => void
  addVideos: (videos: Array<Video>) => void
}

export const useVideos = (): UseVideos => {
  const { db } = useContext(DatabaseContext)
  const [videos, setVideos] = useState<any[]>([])
  const addVideo = async (video: Video) => {
    void (await db)?.videos.insert(video)
  }
  const addVideos = async (videos: Array<Video>) => {
    void (await db)?.videos.bulkInsert(videos)
  }
  useEffect(() => {
    let subscription: Subscription
    void db?.then((database) => {
      subscription = database.videos.find().$.subscribe((result) => {
        const items = result.map((item) => item.toJSON())
        setVideos(items)
      })
    })
    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [db])
  return { videos, addVideo, addVideos }
}
