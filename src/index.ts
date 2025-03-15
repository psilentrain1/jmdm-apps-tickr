import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import packageInfo from "../package.json";
import path from "path";
import fs from "fs";
import { createDB, searchDB } from "./utils/db.utils";
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export const dbLoc = path.join(app.getPath("appData"), "tickr", "tickr.db");
// export const dbLoc = path.join(__dirname, "store", "tickr.db");
console.log("Database location: ", dbLoc);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  // Run startup tasks
  startUpTasks();

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 1000,
    width: 1600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// appInfo funcs
ipcMain.handle("getAppVersion", () => {
  return packageInfo.version;
});

// API funcs
ipcMain.handle(
  "search",
  async (event: IpcMainInvokeEvent, searchParam: string) => {
    const results = await searchDB(searchParam);
    return results;
  },
);

// Settings funcs

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

app.disableHardwareAcceleration();

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Start up tasks
function startUpTasks() {
  console.log("Start up tasks running");
  if (!fs.existsSync(dbLoc)) {
    createDB();
  }
}
