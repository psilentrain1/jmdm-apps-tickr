import { Ticker, Prices, TickerInfo, Watchlist } from "./api.types";
import { DateRange, GainLoss } from "./component.types";

export interface State {
  tickerInfo: TickerInfo;
  setTickerInfo: (newTickerInfo: TickerInfo) => void;
  gainLoss: GainLoss;
  setGainLoss: (newGainLoss: GainLoss) => void;
  searchInput: string;
  setSearchInput: (newSearchInput: string) => void;
  searchResults: Ticker[];
  setSearchResults: (newSearchResults: Ticker[]) => void;
  tickerChartData: Prices[];
  setTickerChartData: (newTickerChartData: Prices[]) => void;
  tickerChartTimeRange: DateRange;
  setTickerChartTimeRange: (newTickerChartTimeRange: DateRange) => void;
  watchlist: Watchlist;
  setWatchlist: (newWatchlist: Watchlist) => void;
  watchlistTickers: string[];
  setWatchlistTickers: (newWatchlistTickers: string[]) => void;
  watchlistTickerData: { [key: string]: Prices[] };
  setWatchlistTickerData: (newWatchlistTickerData: {
    [key: string]: Prices[];
  }) => void;
  topMovers: [string, number][];
  setTopMovers: (newTopMovers: [string, number][]) => void;
  avgGainLoss: number;
  setAvgGainLoss: (newAvgGainLoss: number) => void;
  avgPercent: number;
  setAvgPercent: (newAvgPercent: number) => void;
}
