import { ipcRenderer } from "electron"
import React from "react"
import ReactDOM from "react-dom"
import { App } from "./app.component.tsx"

ipcRenderer.on("loaded", () => {
  ReactDOM.render(<App />, document.getElementById("app"))
})
