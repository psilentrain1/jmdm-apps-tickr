import { contextBridge, ipcRenderer } from "electron";
import { DateRange } from "./types/component.types";

declare global {
  interface Window {
    appInfo: any;
    api: any;
    watchlist: any;
    settings: any;
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
});

contextBridge.exposeInMainWorld("settings", {});
