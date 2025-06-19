import { create } from 'zustand';

interface MultiSelectDropdownState {
  // Dropdown states by ID
  dropdownStates: Record<string, {
    showDropdown: boolean;
    searchTerm: string;
    selectedValues: string[];
  }>;
  
  // Actions
  setDropdownState: (id: string, state: Partial<{
    showDropdown: boolean;
    searchTerm: string;
    selectedValues: string[];
  }>) => void;
  toggleDropdown: (id: string) => void;
  closeDropdown: (id: string) => void;
  setSearchTerm: (id: string, term: string) => void;
  setSelectedValues: (id: string, values: string[]) => void;
  addValue: (id: string, value: string) => void;
  removeValue: (id: string, value: string) => void;
  resetDropdown: (id: string) => void;
  
  // Getters
  getDropdownState: (id: string) => {
    showDropdown: boolean;
    searchTerm: string;
    selectedValues: string[];
  };
}

const defaultState = {
  showDropdown: false,
  searchTerm: '',
  selectedValues: []
};

export const useMultiSelectDropdownStore = create<MultiSelectDropdownState>((set, get) => ({
  // Initial state
  dropdownStates: {},
  
  // Actions
  setDropdownState: (id: string, state) => {
    set(prev => ({
      dropdownStates: {
        ...prev.dropdownStates,
        [id]: {
          ...defaultState,
          ...prev.dropdownStates[id],
          ...state
        }
      }
    }));
  },
  
  toggleDropdown: (id: string) => {
    const current = get().getDropdownState(id);
    get().setDropdownState(id, { showDropdown: !current.showDropdown });
  },
  
  closeDropdown: (id: string) => {
    get().setDropdownState(id, { showDropdown: false });
  },
  
  setSearchTerm: (id: string, term: string) => {
    get().setDropdownState(id, { searchTerm: term });
  },
  
  setSelectedValues: (id: string, values: string[]) => {
    get().setDropdownState(id, { selectedValues: values });
  },
  
  addValue: (id: string, value: string) => {
    const current = get().getDropdownState(id);
    if (!current.selectedValues.includes(value)) {
      get().setDropdownState(id, { 
        selectedValues: [...current.selectedValues, value] 
      });
    }
  },
  
  removeValue: (id: string, value: string) => {
    const current = get().getDropdownState(id);
    get().setDropdownState(id, { 
      selectedValues: current.selectedValues.filter(v => v !== value) 
    });
  },
  
  resetDropdown: (id: string) => {
    set(prev => ({
      dropdownStates: {
        ...prev.dropdownStates,
        [id]: { ...defaultState }
      }
    }));
  },
  
  // Getters
  getDropdownState: (id: string) => {
    const state = get().dropdownStates[id];
    return state ? { ...state } : { ...defaultState };
  },
}));