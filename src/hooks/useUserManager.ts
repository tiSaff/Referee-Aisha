import { useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { User } from '../types';

export const useUserManager = () => {
  const {
    users,
    selectedUser,
    editingUser,
    userToDelete,
    loading,
    error,
    searchTerm,
    viewMode,
    fetchUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    setSelectedUser,
    setEditingUser,
    setUserToDelete,
    setSearchTerm,
    setViewMode,
    updateEditingUserField,
    clearError,
    getFilteredUsers,
  } = useUserStore();

  // Initialize users on mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Get filtered users using the enhanced search
  const filteredUsers = getFilteredUsers();

  const handleViewUser = async (user: User) => {
    await getUserById(user.id);
    setSelectedUser(user);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
  };

  const handleSaveUser = async () => {
    if (editingUser) {
      await updateUser(editingUser.id, editingUser);
    }
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete.id);
    }
  };

  const closeProfile = () => {
    setSelectedUser(null);
  };

  const closeEditModal = () => {
    setEditingUser(null);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
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
    showProfile: !!selectedUser,
    showEditModal: !!editingUser,
    showDeleteModal: !!userToDelete,
    totalUsers: users.length,
    filteredCount: filteredUsers.length,
    
    // Actions
    handleViewUser,
    handleEditUser,
    handleDeleteUser,
    handleSaveUser,
    handleConfirmDelete,
    closeProfile,
    closeEditModal,
    closeDeleteModal,
    setSearchTerm,
    setViewMode,
    updateEditingUserField,
    clearError,
    refreshUsers: fetchUsers,
  };
};