import { createContext } from "react"
import { RxDatabase } from "rxdb"

interface Context {
  db: Promise<RxDatabase> | null
}

export const DatabaseContext = createContext<Context>({ db: null })
