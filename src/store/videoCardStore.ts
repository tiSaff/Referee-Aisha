import { create } from 'zustand';

interface VideoCardState {
  // State
  showDropdown: boolean;
  activeVideoId: string | null;
  
  // Actions
  setShowDropdown: (show: boolean) => void;
  setActiveVideoId: (id: string | null) => void;
  resetDropdown: () => void;
}

export const useVideoCardStore = create<VideoCardState>((set) => ({
  // Initial state
  showDropdown: false,
  activeVideoId: null,
  
  // Actions
  setShowDropdown: (show: boolean) => set({ showDropdown: show }),
  setActiveVideoId: (id: string | null) => set({ activeVideoId: id }),
  
  resetDropdown: () => set({
    showDropdown: false,
    activeVideoId: null
  }),
}));