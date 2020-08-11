import React from "react"
import ReactDOM from "react-dom"
import { App } from "./foundation/components/app/app.component.tsx"

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("app"))
})
