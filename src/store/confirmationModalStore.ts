import { create } from 'zustand';

interface ConfirmationModalState {
  // State
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  type: 'danger' | 'warning' | 'info';
  onConfirm: (() => void) | null;
  loading: boolean;
  
  // Actions
  showConfirmation: (config: {
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
  }) => void;
  hideConfirmation: () => void;
  setLoading: (loading: boolean) => void;
  handleConfirm: () => void;
}

export const useConfirmationModalStore = create<ConfirmationModalState>((set, get) => ({
  // Initial state
  isOpen: false,
  title: '',
  message: '',
  confirmText: 'Delete',
  cancelText: 'Cancel',
  type: 'danger',
  onConfirm: null,
  loading: false,
  
  // Actions
  showConfirmation: (config) => {
    set({
      isOpen: true,
      title: config.title,
      message: config.message,
      onConfirm: config.onConfirm,
      confirmText: config.confirmText || 'Delete',
      cancelText: config.cancelText || 'Cancel',
      type: config.type || 'danger',
      loading: false
    });
  },
  
  hideConfirmation: () => {
    set({
      isOpen: false,
      title: '',
      message: '',
      onConfirm: null,
      loading: false
    });
  },
  
  setLoading: (loading: boolean) => {
    set({ loading });
  },
  
  handleConfirm: async () => {
    const { onConfirm } = get();
    if (onConfirm) {
      set({ loading: true });
      try {
        await onConfirm();
        get().hideConfirmation();
      } catch (error) {
        set({ loading: false });
        console.error('Confirmation action failed:', error);
      }
    }
  },
}));