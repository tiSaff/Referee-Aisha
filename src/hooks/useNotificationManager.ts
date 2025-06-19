import { useEffect } from 'react';
import { useNotificationStore } from '../store/notificationStore';
import { useUIStore } from '../store/uiStore';
import { useAlertStore } from '../store/alertStore';
import { Notification } from '../types';

export const useNotificationManager = () => {
  const {
    notifications,
    notificationToDelete,
    loading,
    error,
    searchTerm,
    selectedFilter,
    title,
    message,
    allUsersExternal,
    selectedUsersExternal,
    fetchNotifications,
    createNotification,
    deleteNotification,
    setNotificationToDelete,
    setSearchTerm,
    setSelectedFilter,
    setTitle,
    setMessage,
    setAllUsersExternal,
    setSelectedUsersExternal,
    resetForm,
    clearError,
    getFilteredNotifications,
    getNotificationStats
  } = useNotificationStore();

  const { 
    showAddNotificationModal,
    showDeleteNotificationModal,
    setModalState 
  } = useUIStore();

  // Alert store for success messages
  const { showAlert } = useAlertStore();

  // Initialize notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Filtered notifications based on search and filter
  const filteredNotifications = getFilteredNotifications();
  const statistics = getNotificationStats();

  const handleCreateNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await createNotification({
      title,
      message,
      assignedTo: allUsersExternal ? 'All Users' : 'Specific Users',
      recipients: allUsersExternal ? 45 : selectedUsersExternal.split(',').length
    });
    
    if (!error) {
      setModalState('showAddNotificationModal', false);
      // Show success alert
      showAlert(`Notification "${title}" sent successfully!`);
    }
  };

  const handleDeleteNotification = async (notificationId: number) => {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      setNotificationToDelete(notification);
      setModalState('showDeleteNotificationModal', true);
    }
  };

  const confirmDeleteNotification = async () => {
    if (notificationToDelete) {
      await deleteNotification(notificationToDelete.id);
      setModalState('showDeleteNotificationModal', false);
    }
  };

  return {
    // State
    notifications: filteredNotifications,
    allNotifications: notifications,
    notificationToDelete,
    loading,
    error,
    searchTerm,
    selectedFilter,
    showAddNotificationModal,
    showDeleteNotificationModal,
    title,
    message,
    allUsersExternal,
    selectedUsersExternal,
    statistics,
    totalNotifications: notifications.length,
    
    // Actions
    handleCreateNotification,
    handleDeleteNotification,
    confirmDeleteNotification,
    setSearchTerm,
    setSelectedFilter,
    setTitle,
    setMessage,
    setAllUsersExternal,
    setSelectedUsersExternal,
    clearError,
    refreshNotifications: fetchNotifications,
  };
};