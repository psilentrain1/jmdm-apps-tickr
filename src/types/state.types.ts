import { Ticker } from "./api.types";

export interface State {
  searchInput: string;
  setSearchInput: (newSearchInput: string) => void;
  searchResults: Ticker[];
  setSearchResults: (newSearchResults: Ticker[]) => void;
}
