import { create } from 'zustand';

interface ChangePasswordModalState {
  // State
  newPassword: string;
  confirmPassword: string;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  
  // Actions
  setNewPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setShowNewPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  toggleShowNewPassword: () => void;
  toggleShowConfirmPassword: () => void;
  resetForm: () => void;
  
  // Computed values
  getPasswordsMatch: () => boolean;
  getCanSubmit: () => boolean;
}

export const useChangePasswordModalStore = create<ChangePasswordModalState>((set, get) => ({
  // Initial state
  newPassword: '',
  confirmPassword: '',
  showNewPassword: false,
  showConfirmPassword: false,
  
  // Actions
  setNewPassword: (password: string) => set({ newPassword: password }),
  setConfirmPassword: (password: string) => set({ confirmPassword: password }),
  setShowNewPassword: (show: boolean) => set({ showNewPassword: show }),
  setShowConfirmPassword: (show: boolean) => set({ showConfirmPassword: show }),
  
  toggleShowNewPassword: () => {
    const { showNewPassword } = get();
    set({ showNewPassword: !showNewPassword });
  },
  
  toggleShowConfirmPassword: () => {
    const { showConfirmPassword } = get();
    set({ showConfirmPassword: !showConfirmPassword });
  },
  
  resetForm: () => set({
    newPassword: '',
    confirmPassword: '',
    showNewPassword: false,
    showConfirmPassword: false
  }),
  
  // Computed values
  getPasswordsMatch: () => {
    const { newPassword, confirmPassword } = get();
    return newPassword === confirmPassword;
  },
  
  getCanSubmit: () => {
    const { newPassword, confirmPassword } = get();
    const passwordsMatch = newPassword === confirmPassword;
    return newPassword.length > 0 && confirmPassword.length > 0 && passwordsMatch;
  },
}));