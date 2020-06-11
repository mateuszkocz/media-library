import { ipcRenderer } from 'electron'
import React from 'react';
import ReactDOM from "react-dom"
import { App } from "./app.component.tsx"

ipcRenderer.on('loaded', (event, data) => {
  ReactDOM.render(<App/>, document.getElementById("app"))
  document.getElementById('title').innerHTML = data.appName + ' App 2'
  document.getElementById('details').innerHTML = 'built with Electron v' + data.electronVersion
  document.getElementById('versions').innerHTML = 'running on Node v' + data.nodeVersion + ' and Chromium v' + data.chromiumVersion
})

