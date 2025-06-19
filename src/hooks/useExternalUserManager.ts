import { useEffect } from 'react';
import { useExternalUserStore } from '../store/externalUserStore';
import { useUIStore } from '../store/uiStore';
import { useAlertStore } from '../store/alertStore';
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
    createUser,
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

  const { 
    setModalState,
    showAddExternalUserModal,
    showEditExternalUserModal,
    showDeleteExternalUserModal,
    showExternalUserProfileModal
  } = useUIStore();

  // Alert store for success messages
  const { showAlert } = useAlertStore();

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

  const handleAddUser = () => {
    setModalState('showAddExternalUserModal', true);
  };

  const handleCreateUser = async (userData: Partial<User>) => {
    try {
      const newUser = await createUser(userData);
      setModalState('showAddExternalUserModal', false);
      
      // Show success alert
      showAlert(`User "${newUser.name}" created successfully!`);
      return true;
    } catch (error) {
      console.error('Error creating user:', error);
      return false;
    }
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
      
      // Show success alert
      showAlert(`User "${updatedUser.name}" updated successfully!`);
    }
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      const userName = userToDelete.name;
      await deleteUser(userToDelete.id);
      setModalState('showDeleteExternalUserModal', false);
      
      // Show success alert
      showAlert(`User "${userName}" deleted successfully!`);
    }
  };

  const closeAddModal = () => {
    setModalState('showAddExternalUserModal', false);
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
    showAddModal: showAddExternalUserModal,
    showEditModal: showEditExternalUserModal,
    showDeleteModal: showDeleteExternalUserModal,
    showProfileModal: showExternalUserProfileModal,
    
    // Actions
    handleViewUser,
    handleEditUser,
    handleDeleteUser,
    handleAddUser,
    handleCreateUser,
    handleSaveUser,
    handleConfirmDelete,
    closeAddModal,
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