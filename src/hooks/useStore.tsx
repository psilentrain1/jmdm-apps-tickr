import { create } from "zustand";
import { State } from "../types/state.types";

export const useStore = create<State>((set) => ({
  searchInput: "",
  setSearchInput: (newSearchInput) => set({ searchInput: newSearchInput }),
}));
