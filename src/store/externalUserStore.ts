import { create } from 'zustand';
import { User, ApiError } from '../types';

interface ExternalUserState {
  users: User[];
  selectedUser: User | null;
  editingUser: User | null;
  userToDelete: User | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  viewMode: 'grid' | 'list';
  activeTab: 'all' | 'active' | 'inactive' | 'deleted';
  
  // Actions
  fetchUsers: () => Promise<void>;
  getUserById: (id: number) => Promise<void>;
  updateUser: (id: number, userData: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  setEditingUser: (user: User | null) => void;
  setUserToDelete: (user: User | null) => void;
  setSearchTerm: (term: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setActiveTab: (tab: 'all' | 'active' | 'inactive' | 'deleted') => void;
  updateEditingUserField: (field: string, value: string | boolean) => void;
  clearError: () => void;
  getFilteredUsers: () => User[];
  getUserStats: () => { total: number; active: number; inactive: number; deleted: number };
}

export const useExternalUserStore = create<ExternalUserState>((set, get) => ({
  users: [],
  selectedUser: null,
  editingUser: null,
  userToDelete: null,
  loading: false,
  error: null,
  searchTerm: '',
  viewMode: 'grid',
  activeTab: 'all',

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      // Mock external users data with different statuses
      const mockUsers: User[] = [
        {
          id: 1223,
          name: 'Islom',
          firstName: 'Islom',
          lastName: '',
          email: 'iazimov61@gmail.com',
          status: 'active',
          joinDate: '2025-06-18',
          lastActive: '2025-06-18 23:46:22',
          location: 'UZ',
          phone: '881208484',
          videosAnalyzed: 45,
          department: 'Uzbekistan',
          permissions: {
            videoPendingPermission: true,
            videoUnderReviewPermission: false,
            videoAcceptedPermission: true,
            uploadVideoPermission: false,
            settingsAddConsiderationsPermission: false,
            settingsAddTopicPermission: false,
            addNotification: false,
            viewUsersExternal: false,
            accountResponsibleForAddingUsers: false,
            accountIsActive: true
          }
        },
        {
          id: 1222,
          name: 'Omar said almanthari',
          firstName: 'Omar',
          lastName: 'said almanthari',
          email: 'romar640@gmail.com',
          status: 'active',
          joinDate: '2025-06-18',
          lastActive: '2025-06-18 20:43:04',
          location: '',
          phone: '009689706109',
          videosAnalyzed: 32,
          department: 'Oman',
          permissions: {
            videoPendingPermission: true,
            videoUnderReviewPermission: false,
            videoAcceptedPermission: true,
            uploadVideoPermission: false,
            settingsAddConsiderationsPermission: false,
            settingsAddTopicPermission: false,
            addNotification: false,
            viewUsersExternal: false,
            accountResponsibleForAddingUsers: false,
            accountIsActive: true
          }
        },
        {
          id: 1221,
          name: 'MUHAMAD AFIQ NAIM AHMAD KHILMI',
          firstName: 'MUHAMAD AFIQ NAIM',
          lastName: 'AHMAD KHILMI',
          email: 'afiqnaim10.an@gmail.com',
          status: 'inactive',
          joinDate: '2025-06-18',
          lastActive: '2025-06-18 19:00:13',
          location: 'MY',
          phone: '0112412423',
          videosAnalyzed: 28,
          department: 'Malaysia',
          permissions: {
            videoPendingPermission: true,
            videoUnderReviewPermission: false,
            videoAcceptedPermission: true,
            uploadVideoPermission: false,
            settingsAddConsiderationsPermission: false,
            settingsAddTopicPermission: false,
            addNotification: false,
            viewUsersExternal: false,
            accountResponsibleForAddingUsers: false,
            accountIsActive: false
          }
        },
        {
          id: 1220,
          name: 'Carlos Miguel Lopez',
          firstName: 'Carlos Miguel',
          lastName: 'Lopez',
          email: 'carlos796@outlook.es',
          status: 'active',
          joinDate: '2025-06-18',
          lastActive: '2025-06-18 18:52:32',
          location: 'ES',
          phone: '671269455',
          videosAnalyzed: 67,
          department: 'Spain',
          permissions: {
            videoPendingPermission: true,
            videoUnderReviewPermission: false,
            videoAcceptedPermission: true,
            uploadVideoPermission: false,
            settingsAddConsiderationsPermission: false,
            settingsAddTopicPermission: false,
            addNotification: false,
            viewUsersExternal: false,
            accountResponsibleForAddingUsers: false,
            accountIsActive: true
          }
        },
        {
          id: 1219,
          name: 'Nur Amali Ihsanuddin',
          firstName: 'Nur Amali',
          lastName: 'Ihsanuddin',
          email: 'boltamali@yahoo.com.my',
          status: 'active',
          joinDate: '2025-06-18',
          lastActive: '2025-06-18 17:41:02',
          location: 'MY',
          phone: '601159530435',
          videosAnalyzed: 89,
          department: 'Malaysia',
          permissions: {
            videoPendingPermission: true,
            videoUnderReviewPermission: false,
            videoAcceptedPermission: true,
            uploadVideoPermission: false,
            settingsAddConsiderationsPermission: false,
            settingsAddTopicPermission: false,
            addNotification: false,
            viewUsersExternal: false,
            accountResponsibleForAddingUsers: false,
            accountIsActive: true
          }
        },
        // Add some deleted users for demonstration
        {
          id: 1218,
          name: 'John Deleted User',
          firstName: 'John',
          lastName: 'Deleted User',
          email: 'john.deleted@example.com',
          status: 'inactive',
          joinDate: '2025-06-15',
          lastActive: '2025-06-15 10:00:00',
          location: 'US',
          phone: '1234567890',
          videosAnalyzed: 15,
          department: 'United States',
          permissions: {
            videoPendingPermission: false,
            videoUnderReviewPermission: false,
            videoAcceptedPermission: false,
            uploadVideoPermission: false,
            settingsAddConsiderationsPermission: false,
            settingsAddTopicPermission: false,
            addNotification: false,
            viewUsersExternal: false,
            accountResponsibleForAddingUsers: false,
            accountIsActive: false
          }
        }
      ];
      
      set({ users: mockUsers, loading: false });
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false });
    }
  },

  getUserById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const users = get().users;
      const user = users.find(u => u.id === id);
      
      if (!user) {
        throw new Error('User not found');
      }

      set({ selectedUser: user, loading: false });
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false });
    }
  },

  updateUser: async (id: number, userData: Partial<User>) => {
    set({ loading: true, error: null });
    try {
      const currentUsers = get().users;
      const updatedUsers = currentUsers.map(user => 
        user.id === id ? { ...user, ...userData } : user
      );
      set({ 
        users: updatedUsers, 
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

  setActiveTab: (tab: 'all' | 'active' | 'inactive' | 'deleted') => {
    set({ activeTab: tab });
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
    const { users, searchTerm, activeTab } = get();
    
    return users.filter(user => {
      const matchesSearch = !searchTerm.trim() || 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toString().includes(searchTerm);
      
      const matchesTab = activeTab === 'all' || 
        (activeTab === 'active' && user.status === 'active') ||
        (activeTab === 'inactive' && user.status === 'inactive') ||
        (activeTab === 'deleted' && user.status === 'inactive' && !user.permissions.accountIsActive);
      
      return matchesSearch && matchesTab;
    });
  },

  getUserStats: () => {
    const { users } = get();
    return {
      total: users.length,
      active: users.filter(u => u.status === 'active').length,
      inactive: users.filter(u => u.status === 'inactive').length,
      deleted: users.filter(u => u.status === 'inactive' && !u.permissions.accountIsActive).length,
    };
  },
}));