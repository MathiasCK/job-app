import { create } from "zustand";

type TabState = {
  tabs: ["About", "Qualifications", "Responsibilities"];
  activeTab: string;
  setActiveTab: (tab: "About" | "Qualifications" | "Responsibilities") => void;
};

const useTab = create<TabState>(set => ({
  tabs: ["About", "Qualifications", "Responsibilities"],
  activeTab: "About",
  setActiveTab: tab => {
    set({ activeTab: tab });
  },
}));

export default useTab;
