import { create } from 'zustand';

interface SidebarState {
  // State
  settingsExpanded: boolean;
  logsExpanded: boolean;
  accessControlExpanded: boolean;
  
  // Actions
  setSettingsExpanded: (expanded: boolean) => void;
  setLogsExpanded: (expanded: boolean) => void;
  setAccessControlExpanded: (expanded: boolean) => void;
  toggleSettingsExpanded: () => void;
  toggleLogsExpanded: () => void;
  toggleAccessControlExpanded: () => void;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  // Initial state
  settingsExpanded: false,
  logsExpanded: false,
  accessControlExpanded: false,
  
  // Actions
  setSettingsExpanded: (expanded: boolean) => set({ settingsExpanded: expanded }),
  setLogsExpanded: (expanded: boolean) => set({ logsExpanded: expanded }),
  setAccessControlExpanded: (expanded: boolean) => set({ accessControlExpanded: expanded }),
  
  toggleSettingsExpanded: () => {
    const { settingsExpanded } = get();
    set({ settingsExpanded: !settingsExpanded });
  },
  
  toggleLogsExpanded: () => {
    const { logsExpanded } = get();
    set({ logsExpanded: !logsExpanded });
  },
  
  toggleAccessControlExpanded: () => {
    const { accessControlExpanded } = get();
    set({ accessControlExpanded: !accessControlExpanded });
  },
}));