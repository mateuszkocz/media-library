const path = require("path")
const { Application } = require("spectron")

const appPath = () => {
  switch (process.platform) {
    case "darwin":
      return path.join(
        __dirname,
        "..",
        ".tmp",
        "mac",
        "MediaLibrary.app",
        "Contents",
        "MacOS",
        "MediaLibrary"
      )
    case "linux":
      return path.join(__dirname, "..", ".tmp", "linux", "MediaLibrary")
    case "win32":
      return path.join(
        __dirname,
        "..",
        ".tmp",
        "win-unpacked",
        "MediaLibrary.exe"
      )
    default:
      throw Error(`Unsupported platform ${process.platform}`)
  }
}
global.app = new Application({ path: appPath() })
