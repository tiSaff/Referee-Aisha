import { useEffect } from 'react';
import { useExternalUserStore } from '../store/externalUserStore';
import { useUIStore } from '../store/uiStore';
import { User } from '../types';

export const useExternalUserManager = () => {
  const {
    users,
    selectedUser,
    editingUser,
    userToDelete,
    loading,
    error,
    searchTerm,
    viewMode,
    activeTab,
    fetchUsers,
    getUserById,
    updateUser,
    deleteUser,
    setSelectedUser,
    setEditingUser,
    setUserToDelete,
    setSearchTerm,
    setViewMode,
    setActiveTab,
    updateEditingUserField,
    clearError,
    getFilteredUsers,
    getUserStats,
  } = useExternalUserStore();

  const { setModalState } = useUIStore();

  // Initialize users on mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Get filtered users using the enhanced search
  const filteredUsers = getFilteredUsers();
  const userStats = getUserStats();

  const handleViewUser = async (user: User) => {
    await getUserById(user.id);
    setModalState('showExternalUserProfileModal', true);
  };

  const handleEditUser = (user: User) => {
    console.log('handleEditUser called with user:', user);
    setEditingUser(user);
    setModalState('showEditExternalUserModal', true);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setModalState('showDeleteExternalUserModal', true);
  };

  const handleSaveUser = async () => {
    if (editingUser) {
      console.log('Saving user:', editingUser);
      
      // Update the name field when first/last name changes
      const updatedUser = {
        ...editingUser,
        name: `${editingUser.firstName} ${editingUser.lastName}`.trim()
      };
      
      await updateUser(editingUser.id, updatedUser);
      setModalState('showEditExternalUserModal', false);
    }
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete.id);
      setModalState('showDeleteExternalUserModal', false);
    }
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setModalState('showEditExternalUserModal', false);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setModalState('showDeleteExternalUserModal', false);
  };

  return {
    // State
    users: filteredUsers,
    allUsers: users,
    selectedUser,
    editingUser,
    userToDelete,
    loading,
    error,
    searchTerm,
    viewMode,
    activeTab,
    userStats,
    totalUsers: users.length,
    filteredCount: filteredUsers.length,
    showEditModal: !!editingUser,
    showDeleteModal: !!userToDelete,
    
    // Actions
    handleViewUser,
    handleEditUser,
    handleDeleteUser,
    handleSaveUser,
    handleConfirmDelete,
    closeEditModal,
    closeDeleteModal,
    setSearchTerm,
    setViewMode,
    setActiveTab,
    updateEditingUserField,
    clearError,
    refreshUsers: fetchUsers,
  };
};