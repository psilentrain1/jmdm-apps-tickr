import { create } from "zustand";
import { State } from "../types/state.types";

export const useStore = create<State>((set) => ({
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
}));
