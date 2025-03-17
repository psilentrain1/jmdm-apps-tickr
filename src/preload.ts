import { contextBridge, ipcRenderer } from "electron";

declare global {
  interface Window {
    appInfo: any;
    api: any;
    settings: any;
  }
}

contextBridge.exposeInMainWorld("appInfo", {
  getAppVersion: () => ipcRenderer.invoke("getAppVersion"),
});

contextBridge.exposeInMainWorld("api", {
  search: (searchParam: string) => ipcRenderer.invoke("search", searchParam),
  getPrices: (ticker: string) => ipcRenderer.invoke("getPrices", ticker),
});

contextBridge.exposeInMainWorld("settings", {});
