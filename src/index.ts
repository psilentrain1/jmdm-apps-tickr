import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  IpcMainInvokeEvent,
} from "electron";
import packageInfo from "../package.json";
import path from "path";
import fs from "fs";
import sqlite from "better-sqlite3";
import {
  createDB,
  searchDB,
  getDBPrices,
  getTickerInfo,
  getWatchlistDB,
  setWatchlistDB,
  getSettingDB,
  setSettingDB,
} from "./utils/db.utils";
import { loadSampleData } from "./utils/sampleData.utils";
import { DateRange } from "./types/component.types";
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// export const dbLoc = path.join(app.getPath("appData"), "Tickr", "tickr.db");
export const dbLoc = path.join(
  "/Users/psilentrain1/Documents/development/jmdm-apps-tickr/src",
  "store",
  "tickr.db",
);
console.log("Database location: ", dbLoc);
// Create the database connection
export const db = new sqlite(dbLoc);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const isMac = process.platform === "darwin";

const template = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideothers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  { label: "File", submenu: [isMac ? { role: "close" } : { role: "quit" }] },
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      ...(isMac
        ? [
            { role: "pasteAndMatchStyle" },
            { role: "delete" },
            { role: "selectAll" },
            { type: "separator" },
            {
              label: "Speech",
              submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }],
            },
          ]
        : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
    ],
  },
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forcereload" },
      { role: "toggledevtools" },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      ...(isMac
        ? [
            { type: "separator" },
            { role: "front" },
            { type: "separator" },
            { role: "window" },
          ]
        : [{ role: "close" }]),
    ],
  },
  {
    role: "Help",
    submenu: [
      {
        label: "Load Demo Data",
        click: () => {
          console.log("Click Load Sample Data");
          loadSampleData();
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

let mainWindow: BrowserWindow;

const createWindow = (): void => {
  // Run startup tasks
  startUpTasks();

  // Create the browser window.
  mainWindow = new BrowserWindow({
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

ipcMain.handle(
  "getTickerInfo",
  async (event: IpcMainInvokeEvent, ticker: string) => {
    const results = await getTickerInfo(ticker);
    return results;
  },
);

ipcMain.handle(
  "getPrices",
  async (event: IpcMainInvokeEvent, ticker: string, dateRange: DateRange) => {
    const results = await getDBPrices(ticker, dateRange);
    return results;
  },
);

// Watchlist
ipcMain.handle("getWatchlist", async () => {
  return await getWatchlistDB();
});

ipcMain.handle(
  "setWatchlist",
  async (event: IpcMainInvokeEvent, watchlist: string[]) => {
    return await setWatchlistDB(watchlist);
  },
);

ipcMain.handle(
  "addTicker",
  async (event: IpcMainInvokeEvent, ticker: string) => {
    const watchlist = await getWatchlistDB();
    const tickers = Object.keys(watchlist);
    if (tickers.includes(ticker)) {
      return;
    }
    tickers.push(ticker);
    return await setWatchlistDB(tickers);
  },
);

// Settings funcs
ipcMain.handle(
  "getSetting",
  async (event: IpcMainInvokeEvent, settingName: string) => {
    return await getSettingDB(settingName);
  },
);

ipcMain.handle(
  "setSetting",
  async (
    event: IpcMainInvokeEvent,
    settingName: string,
    settingValue: string,
  ) => {
    return await setSettingDB(settingName, settingValue);
  },
);

// UI funcs
ipcMain.handle("setTickrMode", async () => {
  /* const mainWindow = BrowserWindow.getFocusedWindow();*/
  if (mainWindow) {
    mainWindow.setMenuBarVisibility(false);
    mainWindow.setSize(600, 64);
  }
  console.log("Setting Tickr Mode");
  return "TickrMode Set";
});

ipcMain.handle("exitTickrMode", async () => {
  mainWindow.setMenuBarVisibility(true);
  mainWindow.maximize();
  console.log("Exiting Tickr Mode");
  return "Exiting Tickr Mode";
});

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
  const file = fs.readFileSync(dbLoc);
  if (file) {
    if (file.length === 0) {
      createDB();
    }
  }

  console.log("Start up tasks complete");
}
