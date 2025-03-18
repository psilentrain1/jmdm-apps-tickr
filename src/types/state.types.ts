import { Ticker, Prices, TickerInfo } from "./api.types";
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
  watchlist: string[];
  setWatchlist: (newWatchlist: string[]) => void;
}
