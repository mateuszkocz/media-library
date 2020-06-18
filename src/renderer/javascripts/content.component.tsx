import { Box, Button } from "@chakra-ui/core"
import { Router } from "@reach/router"
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react"
import { Subscription } from "rxjs"
import { DatabaseContext } from "./database.context"
import { Settings } from "./settings.component"
import { Videos } from "./videos.component"

const useHeroes = () => {
  const { db } = useContext(DatabaseContext)
  const [heroes, setHeroes] = useState<any[]>([])
  const addHero = async (hero: { name: string; color: string }) => {
    void (await db)?.heroes.insert(hero)
  }
  useEffect(() => {
    let subscription: Subscription
    void db?.then((database) => {
      subscription = database.heroes.find().$.subscribe((result) => {
        const items = result.map((item) => item.toJSON())
        setHeroes(items)
      })
    })
    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [db])
  return { heroes, addHero }
}

const Main: FunctionComponent<{ path: string }> = () => {
  const { heroes, addHero } = useHeroes()

  return (
    <div>
      Main
      {heroes.map((hero) => (
        <div key={hero._id}>
          {hero._id} | {hero.name} | {hero.color}
        </div>
      ))}
      <Button onClick={() => addHero({ name: "Mozo", color: "blue" })}>
        Add hero
      </Button>
    </div>
  )
}

export const Content: FunctionComponent = () => {
  return (
    <Box as={Router} p="5" width="100%">
      <Main path="/" />
      <Videos path="/videos" />
      <Settings path="/settings" />
    </Box>
  )
}
