import { Prices, Ticker, TickerInfo, Watchlist } from "./api.types";
import { DateRange } from "./component.types";

export interface AppInfo {
  getAppVersion: () => Promise<string>;
}

export interface API {
  search: (searchParam: string) => Promise<Ticker[]>;
  getTickerInfo: (ticker: string) => Promise<TickerInfo>;
  getPrices: (ticker: string, dateRange: DateRange) => Promise<Prices[]>;
}

export interface WatchlistBridge {
  getWatchlist: () => Promise<Watchlist>;
  setWatchlist: (watchlist: string[]) => Promise<void>;
  addTicker: (ticker: string) => Promise<void>;
}

export interface UI {
  setTickrMode: () => Promise<void>;
  exitTickrMode: () => Promise<void>;
}

export interface Settings {
  getSetting: (settingName: string) => Promise<string>;
  setSetting: (settingName: string, settingValue: string) => Promise<void>;
}
