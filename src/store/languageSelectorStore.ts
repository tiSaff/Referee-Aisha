import { create } from 'zustand';

interface LanguageSelectorState {
  // State
  isOpen: boolean;
  
  // Actions
  setIsOpen: (open: boolean) => void;
  toggleOpen: () => void;
  closeDropdown: () => void;
}

export const useLanguageSelectorStore = create<LanguageSelectorState>((set, get) => ({
  // Initial state
  isOpen: false,
  
  // Actions
  setIsOpen: (open: boolean) => {
    console.log('LanguageSelectorStore: setIsOpen called with:', open);
    set({ isOpen: open });
  },
  
  toggleOpen: () => {
    const { isOpen } = get();
    console.log('LanguageSelectorStore: toggleOpen called, current state:', isOpen, 'new state:', !isOpen);
    set({ isOpen: !isOpen });
  },
  
  closeDropdown: () => {
    console.log('LanguageSelectorStore: closeDropdown called');
    set({ isOpen: false });
  },
}));