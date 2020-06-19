import { useContext, useEffect, useState } from "react"
import { Subscription } from "rxjs"
import { DatabaseContext } from "./database.context"

export const useVideos = () => {
  const { db } = useContext(DatabaseContext)
  const [videos, setVideos] = useState<any[]>([])
  const addVideo = async (hero: { name: string; color: string }) => {
    void (await db)?.videos.insert(hero)
  }
  const addVideos = async (videos: any) => {
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
