import { create } from "zustand";
import { State } from "../types/state.types";

export const useStore = create<State>((set) => ({
  // Ticker Info
  tickerInfo: [
    {
      ticker_id: 0,
      ticker: "",
      ticker_type: "",
      ticker_name: "",
      industry: "",
      sector: "",
      description: "",
      cached_date: "",
    },
    {
      ticker: "",
      date: "",
      close: 0,
      volume: 0,
      open: 0,
      high: 0,
      low: 0,
    },
    true,
    0,
    0,
  ],
  setTickerInfo: (newTickerInfo) => set({ tickerInfo: newTickerInfo }),
  gainLoss: {
    gain: false,
    diff: 0,
    percent: 0,
  },
  setGainLoss: (newGainLoss) => set({ gainLoss: newGainLoss }),

  // Search
  searchInput: "",
  setSearchInput: (newSearchInput) => set({ searchInput: newSearchInput }),
  searchResults: [],
  setSearchResults: (newSearchResults) =>
    set({ searchResults: newSearchResults }),

  // Charts
  tickerChartData: [],
  setTickerChartData: (newTickerChartData) =>
    set({ tickerChartData: newTickerChartData }),
  tickerChartTimeRange: "1y",
  setTickerChartTimeRange: (newTickerChartTimeRange) =>
    set({ tickerChartTimeRange: newTickerChartTimeRange }),

  // Watchlist
  watchlist: {},
  setWatchlist: (newWatchlist) => set({ watchlist: newWatchlist }),
  watchlistTickers: [],
  setWatchlistTickers: (newWatchlistTickers) =>
    set({ watchlistTickers: newWatchlistTickers }),
  watchlistTickerData: {},
  setWatchlistTickerData: (newWatchlistTickerData) =>
    set({ watchlistTickerData: newWatchlistTickerData }),

  // Dashboard
  topMovers: [],
  setTopMovers: (newTopMovers) => set({ topMovers: newTopMovers }),
  avgGainLoss: 0,
  setAvgGainLoss: (newAvgGainLoss) => set({ avgGainLoss: newAvgGainLoss }),
  avgPercent: 0,
  setAvgPercent: (newAvgPercent) => set({ avgPercent: newAvgPercent }),

  // Settings
  // Future settings can be added here
  // For now, getting and setting directly to/from DB.

  // UI
  sidebarOpen: true,
  setSidebarOpen: (newSidebarOpen) => set({ sidebarOpen: newSidebarOpen }),
  tickrMode: false,
  setTickrMode: (newTickrMode) => set({ tickrMode: newTickrMode }),
  isLoading: false,
  setIsLoading: (newIsLoading) => set({ isLoading: newIsLoading }),
}));
