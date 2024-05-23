import { create } from "zustand";

type SearchState = {
  searchQuery: string;
  setSearchQuery: (search: string) => void;
};

const useTab = create<SearchState>(set => ({
  searchQuery: "",
  setSearchQuery: search => {
    set({ searchQuery: search });
  },
}));

export default useTab;
