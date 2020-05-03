const electron = require("electron");
const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

const installExtensions = async () => {
  const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');

  const extensions = [REDUX_DEVTOOLS];
  for (const extension of extensions) {
    try {
      const name = await installExtension(extension);
      console.log(`Added Extension:  ${name}`);
    } catch (e) {
      console.log('An error occurred: ', err);
    }
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", async () => {
  createWindow();

  if (isDev) {
    // Install extensions
    await installExtensions();

    // Auto-open dev tools
    mainWindow.webContents.openDevTools();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
