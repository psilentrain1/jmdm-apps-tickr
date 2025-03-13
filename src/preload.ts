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

contextBridge.exposeInMainWorld("api", {});

contextBridge.exposeInMainWorld("settings", {});
