import { create } from 'zustand';

interface ExternalUserEditModalState {
  // Country dropdown state
  showCountryDropdown: boolean;
  countrySearchTerm: string;
  
  // Actions
  setShowCountryDropdown: (show: boolean) => void;
  setCountrySearchTerm: (term: string) => void;
  resetModal: () => void;
}

export const useExternalUserEditModalStore = create<ExternalUserEditModalState>((set) => ({
  // Initial state
  showCountryDropdown: false,
  countrySearchTerm: '',
  
  // Actions
  setShowCountryDropdown: (show: boolean) => set({ showCountryDropdown: show }),
  setCountrySearchTerm: (term: string) => set({ countrySearchTerm: term }),
  
  resetModal: () => set({
    showCountryDropdown: false,
    countrySearchTerm: ''
  }),
}));