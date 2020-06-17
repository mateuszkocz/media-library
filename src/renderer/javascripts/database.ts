import { createRxDatabase, RxDatabase } from "rxdb"
import pouchdbAdapterIdb from "pouchdb-adapter-idb"
import { addRxPlugin } from "rxdb"

addRxPlugin(pouchdbAdapterIdb)

const schema = {
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

let database: Promise<RxDatabase>
export const getDatabase = (): Promise<RxDatabase> => {
  if (!database) {
    database = createDatabase("heroes", "idb")
  }
  return database
}

const createDatabase = async (
  name: string,
  adapter: string
): Promise<RxDatabase> => {
  const db = await createRxDatabase({
    name,
    adapter,
    password: "somepassword", // TODO: Find out if it's worth using a password.
  })
  await db.collection({
    name: "heroes",
    schema: schema,
  })
  return db
}
