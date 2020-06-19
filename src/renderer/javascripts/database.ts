import { createRxDatabase, RxDatabase } from "rxdb"
import pouchdbAdapterIdb from "pouchdb-adapter-idb"
import { addRxPlugin } from "rxdb"

addRxPlugin(pouchdbAdapterIdb)

const schema = {
  title: "Videos",
  description: "User's video store.",
  version: 0,
  type: "object",
  properties: {
    fileName: {
      type: "string",
    },
    filePath: {
      type: "string",
    },
    title: {
      type: "string",
      default: "",
    },
    duration: {
      type: "number",
    },
    favourite: {
      type: "boolean",
      default: false,
    },
    thumbnails: {
      type: "array",
      default: [],
      items: {
        type: "string",
      },
    },
  },
  required: [
    "fileName",
    "filePath",
    "title",
    "duration",
    "favourite",
    "thumbnails",
  ],
}

let database: Promise<RxDatabase>
export const getDatabase = (): Promise<RxDatabase> => {
  if (!database) {
    database = createDatabase("media", "idb")
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
    name: "videos",
    schema: schema,
  })
  return db
}
