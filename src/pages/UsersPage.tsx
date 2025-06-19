import React from 'react';
import { 
  Search, 
  Users as UsersIcon,
  Grid,
  List,
  X,
  AlertTriangle,
  Check,
  ChevronDown
} from 'lucide-react';
import { useUserManager } from '../hooks/useUserManager';
import { useUsersPageStore } from '../store/usersPageStore';
import { usePagination } from '../hooks/usePagination';
import { useAlertStore } from '../store/alertStore';
import { useConfirmationModalStore } from '../store/confirmationModalStore';
import { useMultiSelectDropdownStore } from '../store/multiSelectDropdownStore';
import { User } from '../types';
import ChangePasswordModal from '../components/users/ChangePasswordModal';
import UserCard from '../components/users/UserCard';
import UserTable from '../components/users/UserTable';
import UserProfileModal from '../components/users/UserProfileModal';
import DeleteUserModal from '../components/users/DeleteUserModal';
import ImageUpload from '../components/users/ImageUpload';
import PermissionsSection from '../components/users/PermissionsSection';
import FormField from '../components/common/FormField';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import ViewToggle from '../components/common/ViewToggle';
import ErrorDisplay from '../components/common/ErrorDisplay';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PageHeader from '../components/common/PageHeader';
import Pagination from '../components/common/Pagination';
import PageAlert from '../components/common/PageAlert';
import MultiSelectDropdown from '../components/common/MultiSelectDropdown';

// Role options for MySAFF users
const roleOptions = [
  { value: 'Super Admin', label: 'Super Admin' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Media SAFFIR', label: 'Media SAFFIR' },
  { value: 'Event SAFFIR', label: 'Event SAFFIR' },
  { value: 'Jailan', label: 'Jailan' },
  { value: 'ss22', label: 'ss22' },
  { value: 'ww', label: 'ww' }
];

const UsersPage: React.FC = () => {
  const {
    users,
    selectedUser,
    editingUser,
    userToDelete,
    loading,
    error,
    searchTerm,
    viewMode,
    showProfile,
    showEditModal,
    showDeleteModal,
    totalUsers,
    filteredCount,
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
  } = useUserManager();

  // Alert store for success messages
  const { isVisible: alertVisible, message: alertMessage, hideAlert } = useAlertStore();

  // Confirmation modal store
  const { showConfirmation } = useConfirmationModalStore();

  // Pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedData: paginatedUsers,
    goToPage
  } = usePagination({
    data: users,
    itemsPerPage: 12,
    initialPage: 1
  });

  // Zustand store for local state
  const {
    showChangePasswordModal,
    selectedImage,
    imagePreview,
    setShowChangePasswordModal,
    setSelectedImage,
    setImagePreview,
    resetImageUpload,
    resetAll
  } = useUsersPageStore();

  // Multi-select dropdown for roles
  const roleDropdownId = 'user-roles';
  const {
    getDropdownState,
    toggleDropdown,
    closeDropdown,
    setSearchTerm: setDropdownSearchTerm,
    setSelectedValues,
    addValue,
    removeValue,
    resetDropdown
  } = useMultiSelectDropdownStore();

  const roleDropdownState = getDropdownState(roleDropdownId);

  // Initialize dropdown with user's current roles
  React.useEffect(() => {
    if (showEditModal && editingUser?.department) {
      const currentRoles = editingUser.department.split(', ').filter(role => role.trim());
      setSelectedValues(roleDropdownId, currentRoles);
    }
  }, [showEditModal, editingUser?.department, setSelectedValues]);

  // Handle image selection
  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Remove selected image
  const removeImage = () => {
    resetImageUpload();
  };

  // Handle change password toggle
  const handleChangePasswordClick = () => {
    if (editingUser) {
      setShowChangePasswordModal(true);
    }
  };

  // Handle save password with success alert
  const handleSavePassword = (newPassword: string) => {
    console.log('Saving new password:', newPassword);
    setShowChangePasswordModal(false);
    
    // Show success alert
    const { showAlert } = useAlertStore.getState();
    showAlert('Password updated successfully!');
  };

  // Enhanced save user with success alert
  const handleSaveUserWithAlert = async () => {
    await handleSaveUser();
    
    // Show success alert after successful save
    if (editingUser) {
      const { showAlert } = useAlertStore.getState();
      showAlert(`User "${editingUser.name}" updated successfully!`);
    }
  };

  // Enhanced delete user with confirmation and success alert
  const handleDeleteUserWithConfirmation = (user: User) => {
    showConfirmation({
      title: 'Delete User',
      message: `Are you sure you want to delete "${user.name}"? This action cannot be undone and will permanently remove all their data, including their profile, video analysis history (${user.videosAnalyzed} videos), and all associated permissions.`,
      confirmText: 'Delete User',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: async () => {
        const userName = user.name;
        await handleConfirmDelete();
        
        // Show success alert after successful delete
        const { showAlert } = useAlertStore.getState();
        showAlert(`User "${userName}" deleted successfully!`);
      }
    });
  };

  // Handle role selection
  const handleRoleSelect = (role: string) => {
    if (roleDropdownState.selectedValues.includes(role)) {
      removeValue(roleDropdownId, role);
    } else {
      addValue(roleDropdownId, role);
    }
    
    // Update the editing user's department field
    const updatedRoles = roleDropdownState.selectedValues.includes(role)
      ? roleDropdownState.selectedValues.filter(r => r !== role)
      : [...roleDropdownState.selectedValues, role];
    
    updateEditingUserField('department', updatedRoles.join(', '));
  };

  const handleRemoveRole = (role: string) => {
    removeValue(roleDropdownId, role);
    const updatedRoles = roleDropdownState.selectedValues.filter(r => r !== role);
    updateEditingUserField('department', updatedRoles.join(', '));
  };

  // Handle modal close with cleanup
  const handleCloseEditModal = () => {
    closeEditModal();
    resetAll();
    resetDropdown(roleDropdownId);
  };

  // Clear error when component unmounts
  React.useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  if (loading && users.length === 0) {
    return <LoadingSpinner message="Loading users..." />;
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Page Alert */}
      <PageAlert
        isVisible={alertVisible}
        message={alertMessage}
        onClose={hideAlert}
      />

      {/* Error Display */}
      {error && <ErrorDisplay error={error} onClose={clearError} />}

      {/* Page Header */}
      <PageHeader
        title="Total Users"
        subtitle={searchTerm ? `Showing ${filteredCount} of ${totalUsers} users` : undefined}
        icon={UsersIcon}
        count={totalUsers}
      />

      {/* Search and View Toggle */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search users by name, email, or ID..."
            className="flex-1"
          />
          
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>
      </div>

      {/* Users Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {paginatedUsers.map(user => (
            <UserCard 
              key={user.id} 
              user={user}
              onView={handleViewUser}
              onEdit={handleEditUser}
              onDelete={handleDeleteUserWithConfirmation}
              loading={loading}
            />
          ))}
        </div>
      ) : (
        <UserTable 
          users={paginatedUsers}
          onView={handleViewUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUserWithConfirmation}
          loading={loading}
        />
      )}

      {/* Pagination */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.max(1, totalPages)}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={goToPage}
        />
      </div>

      {users.length === 0 && !loading && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center">
          <UsersIcon className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-sm sm:text-base text-gray-500">
            {searchTerm ? 'Try adjusting your search criteria' : 'No users available'}
          </p>
          {searchTerm && (
            <Button onClick={() => setSearchTerm('')} className="mt-4">
              Clear Search
            </Button>
          )}
        </div>
      )}

      {/* Profile Modal */}
      <UserProfileModal
        isOpen={showProfile}
        onClose={closeProfile}
        user={selectedUser}
      />

      {/* Edit Modal with Multi-Select Role Dropdown */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          {/* Fixed Full Screen Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 min-h-screen"
            onClick={handleCloseEditModal}
          />
          
          {/* Modal Container */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <div 
              className="relative bg-white rounded-xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Edit User</h2>
                <Button variant="ghost" onClick={handleCloseEditModal}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Role Selection using MultiSelectDropdown */}
                <MultiSelectDropdown
                  label="Role"
                  placeholder="Select roles..."
                  options={roleOptions}
                  selectedValues={roleDropdownState.selectedValues}
                  searchTerm={roleDropdownState.searchTerm}
                  showDropdown={roleDropdownState.showDropdown}
                  multiSelect={true}
                  onToggleDropdown={() => toggleDropdown(roleDropdownId)}
                  onSearchChange={(term) => setDropdownSearchTerm(roleDropdownId, term)}
                  onOptionSelect={handleRoleSelect}
                  onRemoveValue={handleRemoveRole}
                />

                {/* Save Button */}
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-200">
                  <Button
                    onClick={handleSaveUserWithAlert}
                    loading={loading}
                    className="px-8"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
        email={editingUser?.email || ''}
        employeeId={editingUser?.id || 0}
        phoneNumber={editingUser?.phone || ''}
        onSave={handleSavePassword}
        loading={loading}
      />
    </div>
  );
};

export default UsersPage;