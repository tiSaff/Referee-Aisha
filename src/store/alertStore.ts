import { create } from 'zustand';

interface AlertState {
  // State
  isVisible: boolean;
  message: string;
  
  // Actions
  showAlert: (message: string) => void;
  hideAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  // Initial state
  isVisible: false,
  message: '',
  
  // Actions
  showAlert: (message: string) => {
    set({ isVisible: true, message });
  },
  
  hideAlert: () => {
    set({ isVisible: false, message: '' });
  },
}));