import { useContext, useEffect, useState } from "react"
import { Subscription } from "rxjs"
import { DatabaseContext } from "../../database/context/database.context"
import { Video } from "../interfaces/video.interface"

type WithId<T> = T & { _id: string }

interface UseVideos {
  videos: Array<WithId<Video>>
  addVideo: (video: Video) => Promise<void>
  addVideos: (videos: Array<Video>) => Promise<void>
  getVideo: (id: string) => Promise<WithId<Video>>
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
  const getVideo = async (id: string): Promise<WithId<Video> | undefined> => {
    return (await db)?.videos.findOne().where("_id").eq(id).exec()
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
  return { videos, addVideo, addVideos, getVideo }
}
