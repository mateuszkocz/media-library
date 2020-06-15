// FIXME: the whole file is a copy paste from the example.

import { createRxDatabase } from "rxdb"

const heroSchema = {
  title: "hero schema",
  description: "describes a simple hero",
  version: 0,
  type: "object",
  properties: {
    id: {
      type: "string",
      primary: true,
    },
    name: {
      type: "string",
    },
    color: {
      type: "string",
    },
  },
  required: ["color"],
}

let _getDatabase // cached
export function getDatabase(name, adapter) {
  if (!_getDatabase) _getDatabase = createDatabase(name, adapter)
  return _getDatabase
}

async function createDatabase(name, adapter) {
  const db = await createRxDatabase({
    name,
    adapter,
    password: "myLongAndStupidPassword",
  })

  console.log("creating hero-collection..")
  await db.collection({
    name: "heroes",
    schema: heroSchema,
  })

  return db
}
