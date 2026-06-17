import { create } from "zustand";
import type { AppStore } from "../types";

export const useAppStore = create<AppStore>((set) => ({
  selectedAppId: "app-1",
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: "config",

  setSelectedAppId: (id) => set({ selectedAppId: id, selectedNodeId: null }),

  setSelectedNodeId: (id) => set({ selectedNodeId: id }),

  toggleMobilePanel: (open) =>
    set((state) => ({
      isMobilePanelOpen: open !== undefined ? open : !state.isMobilePanelOpen,
    })),

  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
}));
