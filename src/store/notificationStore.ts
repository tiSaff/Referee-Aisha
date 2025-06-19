import { create } from 'zustand';
import { Notification, ApiError } from '../types';
import { notificationsApi } from '../api/notifications';

interface NotificationState {
  notifications: Notification[];
  notificationToDelete: Notification | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedFilter: string;
  title: string;
  message: string;
  allUsersExternal: boolean;
  selectedUsersExternal: string;
  
  // Actions
  fetchNotifications: () => Promise<void>;
  createNotification: (notificationData: Partial<Notification>) => Promise<void>;
  deleteNotification: (id: number) => Promise<void>;
  setNotificationToDelete: (notification: Notification | null) => void;
  setSearchTerm: (term: string) => void;
  setSelectedFilter: (filter: string) => void;
  setTitle: (title: string) => void;
  setMessage: (message: string) => void;
  setAllUsersExternal: (value: boolean) => void;
  setSelectedUsersExternal: (users: string) => void;
  resetForm: () => void;
  clearError: () => void;
  getFilteredNotifications: () => Notification[];
  getNotificationStats: () => { totalSent: number; pending: number; failed: number; totalRecipients: number };
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  notificationToDelete: null,
  loading: false,
  error: null,
  searchTerm: '',
  selectedFilter: 'all',
  title: '',
  message: '',
  allUsersExternal: false,
  selectedUsersExternal: '',

  fetchNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const response = await notificationsApi.getNotifications();
      set({ notifications: response.data, loading: false });
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false });
    }
  },

  createNotification: async (notificationData: Partial<Notification>) => {
    set({ loading: true, error: null });
    try {
      const response = await notificationsApi.createNotification(notificationData);
      const currentNotifications = get().notifications;
      set({ 
        notifications: [...currentNotifications, response.data], 
        loading: false 
      });
      get().resetForm();
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false });
    }
  },

  deleteNotification: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await notificationsApi.deleteNotification(id);
      const currentNotifications = get().notifications;
      const filteredNotifications = currentNotifications.filter(notification => notification.id !== id);
      set({ 
        notifications: filteredNotifications,
        notificationToDelete: null,
        loading: false 
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false });
    }
  },

  setNotificationToDelete: (notification: Notification | null) => {
    set({ notificationToDelete: notification });
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
  },

  setSelectedFilter: (filter: string) => {
    set({ selectedFilter: filter });
  },

  setTitle: (title: string) => {
    set({ title });
  },

  setMessage: (message: string) => {
    set({ message });
  },

  setAllUsersExternal: (value: boolean) => {
    set({ allUsersExternal: value });
    if (value) {
      set({ selectedUsersExternal: '' });
    }
  },

  setSelectedUsersExternal: (users: string) => {
    set({ selectedUsersExternal: users });
  },

  resetForm: () => {
    set({
      title: '',
      message: '',
      allUsersExternal: false,
      selectedUsersExternal: ''
    });
  },

  clearError: () => {
    set({ error: null });
  },

  getFilteredNotifications: () => {
    const { notifications, searchTerm, selectedFilter } = get();
    
    return notifications.filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = selectedFilter === 'all' || notification.status === selectedFilter;
      
      return matchesSearch && matchesFilter;
    });
  },

  getNotificationStats: () => {
    const { notifications } = get();
    
    return {
      totalSent: notifications.filter(n => n.status === 'sent').length,
      pending: notifications.filter(n => n.status === 'pending').length,
      failed: notifications.filter(n => n.status === 'failed').length,
      totalRecipients: notifications.reduce((sum, n) => sum + n.recipients, 0),
    };
  }
}));