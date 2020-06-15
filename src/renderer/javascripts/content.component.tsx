import { Box, Button } from "@chakra-ui/core"
import React, { FunctionComponent } from "react"
import { Settings } from "./settings.component"
import { Videos } from "./videos.component"
import { Router } from "@reach/router"
import { getDatabase } from "./database"
import pouchdb_adapter_idb from "pouchdb-adapter-idb"
import { addRxPlugin } from "rxdb"

// FIXME: The whole DB stuff should be elsewehere.
addRxPlugin(pouchdb_adapter_idb)

const Main: FunctionComponent<{ path: string }> = () => {
  const addHero = async function () {
    const db = await getDatabase("heroesdb", "idb")
    const name = "Zenek"
    const color = "Józefowicz"
    const obj = {
      id: "3",
      name: name,
      color: color,
    }
    console.log("inserting hero:")
    console.dir(obj)
    db.heroes.insert(obj)
  }

  const logHeros = async () => {
    const db = await getDatabase("heroesdb", "idb")
    const [first, second] = await db.heroes.find().exec()
    console.log(first.name, second.name)
  }
  return (
    <div>
      Main
      <Button onClick={addHero}>Add</Button>
      <Button onClick={logHeros}>Log</Button>
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
