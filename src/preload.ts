import { contextBridge, ipcRenderer } from "electron";
import { DateRange } from "./types/component.types";

declare global {
  interface Window {
    appInfo: any;
    api: any;
    watchlist: any;
    settings: any;
    ui: any;
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
  setTickrMode: () => ipcRenderer.invoke("setTickrMode"),
});

contextBridge.exposeInMainWorld("ui", {
  setTickrMode: () => ipcRenderer.invoke("setTickrMode"),
  exitTickrMode: () => ipcRenderer.invoke("exitTickrMode"),
});

contextBridge.exposeInMainWorld("settings", {});
