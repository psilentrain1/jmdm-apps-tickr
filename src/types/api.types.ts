export interface Ticker {
  ticker_id?: number;
  ticker: string;
  ticker_type: string;
  ticker_name: string;
  industry: string;
  sector: string;
  description: string;
  cached_date: string;
}

export interface Prices {
  ticker: string;
  date: string;
  close: number;
  volume: number;
  open: number;
  high: number;
  low: number;
}

export type TickerInfo = [Ticker, Prices, boolean, number, number];

export interface Setting {
  setting_value: string;
}

export interface Watchlist {
  [key: string]: TickerInfo;
}

export interface SettingValue {
  setting_value: string;
}
