import { create } from 'zustand';
import { LogEntry, ApiError } from '../types';

interface LogsState {
  logs: LogEntry[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedFilter: string;
  selectedUser: string;
  selectedAction: string;
  
  // Actions
  fetchLogs: () => Promise<void>;
  deleteLog: (id: number) => Promise<void>;
  setSearchTerm: (term: string) => void;
  setSelectedFilter: (filter: string) => void;
  setSelectedUser: (user: string) => void;
  setSelectedAction: (action: string) => void;
  clearError: () => void;
  getFilteredLogs: () => LogEntry[];
  getLogStats: () => { 
    total: number; 
    create: number; 
    update: number; 
    delete: number; 
    login: number; 
    uniqueUsers: number; 
  };
}

export const useLogsStore = create<LogsState>((set, get) => ({
  logs: [],
  loading: false,
  error: null,
  searchTerm: '',
  selectedFilter: 'all',
  selectedUser: 'all',
  selectedAction: 'all',

  fetchLogs: async () => {
    set({ loading: true, error: null });
    try {
      // Mock logs data similar to the VAR Logs screenshot
      const mockLogs: LogEntry[] = [
        {
          id: 851,
          user: 'Sarah Alansari',
          action: 'Delete',
          description: 'Deleted var with ID: 5',
          ipAddress: '0',
          timestamp: '2025-05-26 10:43:09'
        },
        {
          id: 851,
          user: 'Sarah Alansari',
          action: 'Update',
          description: 'Updated var with ID: 6',
          ipAddress: '0',
          timestamp: '2025-05-26 10:43:06'
        },
        {
          id: 851,
          user: 'Sarah Alansari',
          action: 'Create',
          description: 'Created var with ID: 6',
          ipAddress: '0',
          timestamp: '2025-05-26 10:43:02'
        },
        {
          id: 851,
          user: 'Sarah Alansari',
          action: 'Create',
          description: 'Created var with ID: 5',
          ipAddress: '0',
          timestamp: '2025-05-19 11:04:42'
        },
        {
          id: 851,
          user: 'Sarah Alansari',
          action: 'Create',
          description: 'Created var with ID: 4',
          ipAddress: '0',
          timestamp: '2025-05-18 14:38:23'
        },
        {
          id: 851,
          user: 'Sarah Alansari',
          action: 'Delete',
          description: 'Deleted var with ID: 1',
          ipAddress: '77.31.238.178',
          timestamp: '2025-05-15 17:24:28'
        },
        {
          id: 851,
          user: 'Sarah Alansari',
          action: 'Update',
          description: 'Updated var with ID: 3',
          ipAddress: '77.31.238.178',
          timestamp: '2025-05-15 17:24:25'
        },
        {
          id: 851,
          user: 'Sarah Alansari',
          action: 'Create',
          description: 'Created var with ID: 3',
          ipAddress: '77.31.238.178',
          timestamp: '2025-05-15 17:24:17'
        },
        {
          id: 498,
          user: 'Alhussain Hassan',
          action: 'Delete',
          description: 'Deleted var with ID: 2',
          ipAddress: '0',
          timestamp: '2025-05-21 23:36:41'
        },
        {
          id: 498,
          user: 'Alhussain Hassan',
          action: 'Create',
          description: 'Created var with ID: 2',
          ipAddress: '0',
          timestamp: '2025-05-21 23:36:35'
        },
        {
          id: 498,
          user: 'Alhussain Hassan',
          action: 'Update',
          description: 'Updated var with ID: 1',
          ipAddress: '0',
          timestamp: '2025-05-04 17:08:02'
        },
        {
          id: 222,
          user: 'Saad Alsarmi',
          action: 'Create',
          description: 'Created var with ID: 1',
          ipAddress: '0',
          timestamp: '2025-04-08 10:55:02'
        },
        {
          id: 123,
          user: 'Hassan Alhussain',
          action: 'Login',
          description: 'User logged into the system',
          ipAddress: '192.168.1.100',
          timestamp: '2025-06-19 08:30:15'
        },
        {
          id: 124,
          user: 'Hassan Alhussain',
          action: 'View',
          description: 'Viewed video with ID: 15',
          ipAddress: '192.168.1.100',
          timestamp: '2025-06-19 08:35:22'
        },
        {
          id: 125,
          user: 'Sarah Alansari',
          action: 'Update',
          description: 'Updated user profile settings',
          ipAddress: '10.0.0.50',
          timestamp: '2025-06-19 09:15:45'
        }
      ];
      
      set({ logs: mockLogs, loading: false });
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false });
    }
  },

  deleteLog: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const currentLogs = get().logs;
      const filteredLogs = currentLogs.filter(log => log.id !== id);
      set({ 
        logs: filteredLogs, 
        loading: false 
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false });
    }
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
  },

  setSelectedFilter: (filter: string) => {
    set({ selectedFilter: filter });
  },

  setSelectedUser: (user: string) => {
    set({ selectedUser: user });
  },

  setSelectedAction: (action: string) => {
    set({ selectedAction: action });
  },

  clearError: () => {
    set({ error: null });
  },

  getFilteredLogs: () => {
    const { logs, searchTerm, selectedFilter, selectedUser, selectedAction } = get();
    
    return logs.filter(log => {
      const matchesSearch = !searchTerm.trim() || 
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ipAddress.includes(searchTerm);
      
      const matchesUser = selectedUser === 'all' || log.user === selectedUser;
      const matchesAction = selectedAction === 'all' || log.action === selectedAction;
      
      // Time filter logic (simplified for demo)
      const matchesTimeFilter = selectedFilter === 'all' || true; // You can implement date filtering here
      
      return matchesSearch && matchesUser && matchesAction && matchesTimeFilter;
    });
  },

  getLogStats: () => {
    const { logs } = get();
    const uniqueUsers = new Set(logs.map(log => log.user)).size;
    
    return {
      total: logs.length,
      create: logs.filter(log => log.action === 'Create').length,
      update: logs.filter(log => log.action === 'Update').length,
      delete: logs.filter(log => log.action === 'Delete').length,
      login: logs.filter(log => log.action === 'Login').length,
      uniqueUsers,
    };
  },
}));