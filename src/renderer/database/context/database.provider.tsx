import React from "react"
import { FunctionComponent } from "react"
import { RxDatabase } from "rxdb"
import { DatabaseContext } from "./database.context"

export const DatabaseProvider: FunctionComponent<{
  db: Promise<RxDatabase>
}> = ({ children, db }) => {
  return (
    <DatabaseContext.Provider value={{ db }}>
      {children}
    </DatabaseContext.Provider>
  )
}
