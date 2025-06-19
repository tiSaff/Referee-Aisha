import { create } from 'zustand';

interface PaginationState {
  // State
  currentPage: number;
  
  // Actions
  setCurrentPage: (page: number) => void;
  resetToFirstPage: () => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  // Initial state
  currentPage: 1,
  
  // Actions
  setCurrentPage: (page: number) => set({ currentPage: page }),
  resetToFirstPage: () => set({ currentPage: 1 }),
}));