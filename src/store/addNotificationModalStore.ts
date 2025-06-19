import { create } from 'zustand';

interface SelectedUser {
  id: number;
  name: string;
}

interface AddNotificationModalState {
  // State
  showUserDropdown: boolean;
  userSearchTerm: string;
  selectedUsers: SelectedUser[];
  
  // Actions
  setShowUserDropdown: (show: boolean) => void;
  setUserSearchTerm: (term: string) => void;
  setSelectedUsers: (users: SelectedUser[]) => void;
  toggleUserDropdown: () => void;
  closeUserDropdown: () => void;
  
  // User management actions
  addUser: (user: SelectedUser) => void;
  removeUser: (userId: number) => void;
  toggleUser: (user: SelectedUser) => void;
  clearSelectedUsers: () => void;
  
  // Computed values
  isUserSelected: (userId: number) => boolean;
  getSelectedUsersString: () => string;
  
  // Reset
  resetForm: () => void;
}

export const useAddNotificationModalStore = create<AddNotificationModalState>((set, get) => ({
  // Initial state
  showUserDropdown: false,
  userSearchTerm: '',
  selectedUsers: [],
  
  // Basic actions
  setShowUserDropdown: (show: boolean) => set({ showUserDropdown: show }),
  setUserSearchTerm: (term: string) => set({ userSearchTerm: term }),
  setSelectedUsers: (users: SelectedUser[]) => set({ selectedUsers: users }),
  
  toggleUserDropdown: () => {
    const { showUserDropdown } = get();
    set({ showUserDropdown: !showUserDropdown });
  },
  
  closeUserDropdown: () => set({ showUserDropdown: false }),
  
  // User management actions
  addUser: (user: SelectedUser) => {
    const { selectedUsers } = get();
    const isAlreadySelected = selectedUsers.some(u => u.id === user.id);
    
    if (!isAlreadySelected) {
      set({ selectedUsers: [...selectedUsers, user] });
    }
  },
  
  removeUser: (userId: number) => {
    const { selectedUsers } = get();
    set({ selectedUsers: selectedUsers.filter(u => u.id !== userId) });
  },
  
  toggleUser: (user: SelectedUser) => {
    const { selectedUsers } = get();
    const isSelected = selectedUsers.some(u => u.id === user.id);
    
    if (isSelected) {
      // Remove user
      set({ selectedUsers: selectedUsers.filter(u => u.id !== user.id) });
    } else {
      // Add user
      set({ selectedUsers: [...selectedUsers, user] });
    }
  },
  
  clearSelectedUsers: () => set({ selectedUsers: [] }),
  
  // Computed values
  isUserSelected: (userId: number) => {
    const { selectedUsers } = get();
    return selectedUsers.some(u => u.id === userId);
  },
  
  getSelectedUsersString: () => {
    const { selectedUsers } = get();
    return selectedUsers.map(u => `${u.name}-${u.id}`).join(', ');
  },
  
  // Reset
  resetForm: () => set({
    showUserDropdown: false,
    userSearchTerm: '',
    selectedUsers: []
  }),
}));