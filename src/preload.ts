import { contextBridge, ipcRenderer } from "electron";
import { DateRange } from "./types/component.types";
import {
  AppInfo,
  UI,
  Settings,
  WatchlistBridge,
  API,
} from "./types/bridge.types";

declare global {
  interface Window {
    appInfo: AppInfo;
    api: API;
    watchlist: WatchlistBridge;
    settings: Settings;
    ui: UI;
  }
}

contextBridge.exposeInMainWorld("appInfo", {
  getAppVersion: () => ipcRenderer.invoke("getAppVersion"),
});

contextBridge.exposeInMainWorld("api", {
  search: (searchParam: string) => ipcRenderer.invoke("search", searchParam),
  getTickerInfo: (ticker: string) =>
    ipcRenderer.invoke("getTickerInfo", ticker),
  getPrices: (ticker: string, dateRange: DateRange) =>
    ipcRenderer.invoke("getPrices", ticker, dateRange),
});

contextBridge.exposeInMainWorld("watchlist", {
  getWatchlist: () => ipcRenderer.invoke("getWatchlist"),
  setWatchlist: (watchlist: string[]) =>
    ipcRenderer.invoke("setWatchlist", watchlist),
  addTicker: (ticker: string) => ipcRenderer.invoke("addTicker", ticker),
  // setTickrMode: () => ipcRenderer.invoke("setTickrMode"),
});

contextBridge.exposeInMainWorld("ui", {
  setTickrMode: () => ipcRenderer.invoke("setTickrMode"),
  exitTickrMode: () => ipcRenderer.invoke("exitTickrMode"),
});

contextBridge.exposeInMainWorld("settings", {
  getSetting: (settingName: string) =>
    ipcRenderer.invoke("getSetting", settingName),
  setSetting: (settingName: string, settingValue: string) =>
    ipcRenderer.invoke("setSetting", settingName, settingValue),
});
