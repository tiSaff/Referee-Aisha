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
  // Plus // Commented out Add New User functionality
} from 'lucide-react';
import { useUserManager } from '../hooks/useUserManager';
import { useUsersPageStore } from '../store/usersPageStore';
import { usePagination } from '../hooks/usePagination';
import { useAlertStore } from '../store/alertStore';
import { useConfirmationModalStore } from '../store/confirmationModalStore';
// import { useAddUserModalStore } from '../store/addUserModalStore'; // Commented out Add New User functionality
import { User } from '../types';
import ChangePasswordModal from '../components/users/ChangePasswordModal';
// import AddUserModal from '../components/users/AddUserModal'; // Commented out Add New User functionality
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

// Role options for MySAFF users - NEW IMPLEMENTATION
const roleOptions = [
  'Super Admin',
  'Admin', 
  'Media SAFFIR',
  'Event SAFFIR',
  'Jailan',
  'ss22',
  'ww'
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

  // Pagination hook - ALWAYS show pagination
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
    showRoleDropdown,
    roleSearchTerm,
    setShowChangePasswordModal,
    setSelectedImage,
    setImagePreview,
    setShowRoleDropdown,
    setRoleSearchTerm,
    resetImageUpload,
    resetAll
  } = useUsersPageStore();

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
    // Here you would typically call an API to update the password
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

  // Handle multiple role selection
  const getSelectedRoles = (): string[] => {
    if (!editingUser?.department) return [];
    return editingUser.department.split(', ').filter(role => role.trim());
  };

  const handleRoleToggle = (role: string) => {
    const currentRoles = getSelectedRoles();
    const isSelected = currentRoles.includes(role);
    
    let newRoles: string[];
    if (isSelected) {
      newRoles = currentRoles.filter(r => r !== role);
    } else {
      newRoles = [...currentRoles, role];
    }
    
    const rolesString = newRoles.join(', ');
    updateEditingUserField('department', rolesString);
  };

  const removeRole = (roleToRemove: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const currentRoles = getSelectedRoles();
    const newRoles = currentRoles.filter(role => role !== roleToRemove);
    updateEditingUserField('department', newRoles.join(', '));
  };

  // Filter roles based on search term
  const filteredRoles = roleOptions.filter(role =>
    role.toLowerCase().includes(roleSearchTerm.toLowerCase())
  );

  // Handle modal close with cleanup
  const handleCloseEditModal = () => {
    closeEditModal();
    resetAll();
    setShowRoleDropdown(false);
    setRoleSearchTerm('');
  };

  // Clear error when component unmounts
  React.useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showRoleDropdown) {
        setShowRoleDropdown(false);
      }
    };

    if (showRoleDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showRoleDropdown, setShowRoleDropdown]);

  if (loading && users.length === 0) {
    return <LoadingSpinner message="Loading users..." />;
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Page Alert - After Title */}
      <PageAlert
        isVisible={alertVisible}
        message={alertMessage}
        onClose={hideAlert}
      />

      {/* Error Display */}
      {error && <ErrorDisplay error={error} onClose={clearError} />}

      {/* Page Header without Add User Button */}
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

      {/* Pagination - ALWAYS SHOW */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.max(1, totalPages)} // Ensure at least 1 page
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

      {/* Edit Modal with Multi-Select Role Dropdown - FIXED BACKDROP */}
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
                {/* Role Selection - Matching Screenshot Design */}
                <FormField label="Role" required>
                  <div className="relative">
                    {/* Main Dropdown Button */}
                    <div
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center justify-between hover:border-gray-400 transition-colors"
                      onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                    >
                      <span className="text-gray-900 font-medium">
                        {getSelectedRoles().length > 0 
                          ? getSelectedRoles().join(', ')
                          : 'Super Admin, Media SAFFIR'
                        }
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showRoleDropdown ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Multi-Select Dropdown - Matching Screenshot */}
                    {showRoleDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                        {/* Role Options with Checkboxes */}
                        <div className="py-2">
                          {roleOptions.map((role) => {
                            const isSelected = getSelectedRoles().includes(role);
                            return (
                              <div
                                key={role}
                                className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                                onClick={() => handleRoleToggle(role)}
                              >
                                {/* Custom Checkbox with Menu Color */}
                                <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all ${
                                  isSelected 
                                    ? 'border-[#2a835f] bg-[#2a835f]' 
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}>
                                  {isSelected && (
                                    <Check className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                
                                {/* Role Label */}
                                <span className={`text-sm font-medium ${
                                  isSelected ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                  {role}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </FormField>

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