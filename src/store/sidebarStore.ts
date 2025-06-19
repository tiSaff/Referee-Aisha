import { create } from 'zustand';

interface SidebarState {
  // State
  settingsExpanded: boolean;
  logsExpanded: boolean;
  
  // Actions
  setSettingsExpanded: (expanded: boolean) => void;
  setLogsExpanded: (expanded: boolean) => void;
  toggleSettingsExpanded: () => void;
  toggleLogsExpanded: () => void;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  // Initial state
  settingsExpanded: false,
  logsExpanded: false,
  
  // Actions
  setSettingsExpanded: (expanded: boolean) => set({ settingsExpanded: expanded }),
  setLogsExpanded: (expanded: boolean) => set({ logsExpanded: expanded }),
  
  toggleSettingsExpanded: () => {
    const { settingsExpanded } = get();
    set({ settingsExpanded: !settingsExpanded });
  },
  
  toggleLogsExpanded: () => {
    const { logsExpanded } = get();
    set({ logsExpanded: !logsExpanded });
  },
}));