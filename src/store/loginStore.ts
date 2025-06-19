import { create } from 'zustand';

interface LoginState {
  // State
  email: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
  
  // Actions
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setShowPassword: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
  resetForm: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  // Initial state
  email: '',
  password: '',
  showPassword: false,
  loading: false,
  
  // Actions
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  setShowPassword: (show: boolean) => set({ showPassword: show }),
  setLoading: (loading: boolean) => set({ loading }),
  
  resetForm: () => set({
    email: '',
    password: '',
    showPassword: false,
    loading: false
  }),
}));