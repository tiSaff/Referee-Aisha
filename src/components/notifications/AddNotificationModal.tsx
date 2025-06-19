import React, { useEffect } from 'react';
import { useNotificationManager } from '../../hooks/useNotificationManager';
import { useUIStore } from '../../store/uiStore';
import { useExternalUserStore } from '../../store/externalUserStore';
import { useAddNotificationModalStore } from '../../store/addNotificationModalStore';
import Modal from '../common/Modal';
import Button from '../common/Button';
import FormField from '../common/FormField';
import Checkbox from '../common/Checkbox';
import UserDropdown from '../common/UserDropdown';

const AddNotificationModal: React.FC = () => {
  const {
    showAddNotificationModal,
    title,
    message,
    allUsersExternal,
    selectedUsersExternal,
    loading,
    handleCreateNotification,
    setTitle,
    setMessage,
    setAllUsersExternal,
    setSelectedUsersExternal,
  } = useNotificationManager();

  const { setModalState } = useUIStore();
  const { users: externalUsers, fetchUsers } = useExternalUserStore();
  
  // Zustand store for local modal state
  const {
    showUserDropdown,
    userSearchTerm,
    selectedUsers,
    setUserSearchTerm,
    toggleUserDropdown,
    closeUserDropdown,
    toggleUser,
    clearSelectedUsers,
    isUserSelected,
    resetForm
  } = useAddNotificationModalStore();

  // Fetch external users when modal opens
  useEffect(() => {
    if (showAddNotificationModal) {
      fetchUsers();
    }
  }, [showAddNotificationModal, fetchUsers]);

  // Filter users based on search term
  const filteredUsers = externalUsers.filter(user =>
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.id.toString().includes(userSearchTerm)
  );

  // Handle user selection
  const handleUserSelect = (user: {id: number, name: string}) => {
    toggleUser(user);
    
    // Update the notification manager with selected users string
    const updatedSelectedUsers = isUserSelected(user.id) 
      ? selectedUsers.filter(u => u.id !== user.id)
      : [...selectedUsers, user];
    
    const usersString = updatedSelectedUsers.map(u => `${u.name}-${u.id}`).join(', ');
    setSelectedUsersExternal(usersString);
  };

  // Handle "All Users External" checkbox
  const handleAllUsersChange = (checked: boolean) => {
    setAllUsersExternal(checked);
    if (checked) {
      clearSelectedUsers();
      setSelectedUsersExternal('');
    }
  };

  // Remove selected user
  const removeSelectedUser = (userId: number) => {
    const updatedUsers = selectedUsers.filter(u => u.id !== userId);
    const usersString = updatedUsers.map(u => `${u.name}-${u.id}`).join(', ');
    setSelectedUsersExternal(usersString);
  };

  const handleClose = () => {
    setModalState('showAddNotificationModal', false);
    resetForm();
    setUserSearchTerm('');
  };

  return (
    <Modal
      isOpen={showAddNotificationModal}
      onClose={handleClose}
      title="Add Notification"
      size="2xl"
    >
      <form onSubmit={handleCreateNotification} className="space-y-6">
        <FormField label="Title" required>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
            style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
            required
          />
        </FormField>

        <FormField label="Message" required>
          <textarea
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all duration-200"
            style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
            required
          />
        </FormField>

        <Checkbox
          checked={allUsersExternal}
          onChange={handleAllUsersChange}
          label="All Users External"
        />

        <FormField label="Select Users External">
          <UserDropdown
            isOpen={showUserDropdown}
            onToggle={toggleUserDropdown}
            onClose={closeUserDropdown}
            searchTerm={userSearchTerm}
            onSearchChange={setUserSearchTerm}
            users={filteredUsers}
            selectedUsers={selectedUsers}
            onUserSelect={handleUserSelect}
            onRemoveUser={removeSelectedUser}
            isUserSelected={isUserSelected}
            disabled={allUsersExternal}
            placeholder="Select external users..."
            allUsersSelected={allUsersExternal}
            allUsersText="All external users selected"
          />
          
          {allUsersExternal && (
            <p className="text-xs text-gray-500 mt-1">
              This field is disabled because "All Users External" is selected
            </p>
          )}
        </FormField>

        <div className="flex justify-center pt-6">
          <Button type="submit" loading={loading} size="lg">
            Send Notification
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNotificationModal;