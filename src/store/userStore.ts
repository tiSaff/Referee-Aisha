import { create } from 'zustand';
import { User, ApiError } from '../types';
import { usersApi } from '../api/users';

interface UserState {
  users: User[];
  selectedUser: User | null;
  editingUser: User | null;
  userToDelete: User | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  viewMode: 'grid' | 'list';
  
  // Actions
  fetchUsers: () => Promise<void>;
  getUserById: (id: number) => Promise<void>;
  createUser: (userData: Partial<User>) => Promise<void>;
  updateUser: (id: number, userData: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  setEditingUser: (user: User | null) => void;
  setUserToDelete: (user: User | null) => void;
  setSearchTerm: (term: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  updateEditingUserField: (field: string, value: string | boolean) => void;
  clearError: () => void;
  getFilteredUsers: () => User[];
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  selectedUser: null,
  editingUser: null,
  userToDelete: null,
  loading: false,
  error: null,
  searchTerm: '',
  viewMode: 'grid',

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await usersApi.getUsers();
      set({ users: response.data, loading: false });
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false });
    }
  },

  getUserById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await usersApi.getUserById(id);
      set({ selectedUser: response.data, loading: false });
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false });
    }
  },

  createUser: async (userData: Partial<User>) => {
    set({ loading: true, error: null });
    try {
      const response = await usersApi.createUser(userData);
      const currentUsers = get().users;
      set({ 
        users: [...currentUsers, response.data], 
        loading: false 
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false });
    }
  },

  updateUser: async (id: number, userData: Partial<User>) => {
    set({ loading: true, error: null });
    try {
      const response = await usersApi.updateUser(id, userData);
      const currentUsers = get().users;
      const updatedUsers = currentUsers.map(user => 
        user.id === id ? response.data : user
      );
      set({ 
        users: updatedUsers, 
        selectedUser: response.data,
        editingUser: null,
        loading: false 
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false });
    }
  },

  deleteUser: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await usersApi.deleteUser(id);
      const currentUsers = get().users;
      const filteredUsers = currentUsers.filter(user => user.id !== id);
      set({ 
        users: filteredUsers, 
        selectedUser: null,
        userToDelete: null,
        loading: false 
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false });
    }
  },

  setSelectedUser: (user: User | null) => {
    set({ selectedUser: user });
  },

  setEditingUser: (user: User | null) => {
    set({ editingUser: user ? { ...user } : null });
  },

  setUserToDelete: (user: User | null) => {
    set({ userToDelete: user });
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
  },

  setViewMode: (mode: 'grid' | 'list') => {
    set({ viewMode: mode });
  },

  updateEditingUserField: (field: string, value: string | boolean) => {
    const editingUser = get().editingUser;
    if (!editingUser) return;
    
    if (field.startsWith('permissions.')) {
      const permissionField = field.replace('permissions.', '');
      set({
        editingUser: {
          ...editingUser,
          permissions: {
            ...editingUser.permissions,
            [permissionField]: value
          }
        }
      });
    } else {
      // NEW: Handle role field (stored in department for MySAFF users)
      set({
        editingUser: {
          ...editingUser,
          [field]: value
        }
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  getFilteredUsers: () => {
    const { users, searchTerm } = get();
    
    if (!searchTerm.trim()) {
      return users;
    }
    
    const lowerSearchTerm = searchTerm.toLowerCase().trim();
    
    return users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(lowerSearchTerm) ||
                       user.firstName.toLowerCase().includes(lowerSearchTerm) ||
                       user.lastName.toLowerCase().includes(lowerSearchTerm);
      
      const emailMatch = user.email.toLowerCase().includes(lowerSearchTerm);
      const idMatch = user.id.toString().includes(lowerSearchTerm);
      // NEW: Include role search (department field for MySAFF users)
      const roleMatch = user.department?.toLowerCase().includes(lowerSearchTerm);
      
      return nameMatch || emailMatch || idMatch || roleMatch;
    });
  },
}));