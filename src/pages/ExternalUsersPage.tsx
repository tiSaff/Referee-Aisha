import React from 'react';
import { Users as UsersIcon, Download } from 'lucide-react';
import { useExternalUserManager } from '../hooks/useExternalUserManager';
import { useLanguageStore } from '../store/languageStore';
import { usePagination } from '../hooks/usePagination';
import { useAlertStore } from '../store/alertStore';
import { useConfirmationModalStore } from '../store/confirmationModalStore';
import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import ErrorDisplay from '../components/common/ErrorDisplay';
import LoadingSpinner from '../components/common/LoadingSpinner';
import UserCard from '../components/users/UserCard';
import UserTable from '../components/users/UserTable';
import ViewToggle from '../components/common/ViewToggle';
import EmptyState from '../components/common/EmptyState';
import ExternalUserTabs from '../components/external-users/ExternalUserTabs';
import ExternalUserProfileModal from '../components/external-users/ExternalUserProfileModal';
import ExternalUserEditModal from '../components/external-users/ExternalUserEditModal';
import DeleteUserModal from '../components/users/DeleteUserModal';
import Pagination from '../components/common/Pagination';
import PageAlert from '../components/common/PageAlert';

const ExternalUsersPage: React.FC = () => {
  const { currentLanguage } = useLanguageStore();
  const isRTL = currentLanguage === 'ar';
  
  // Alert store for success messages
  const { isVisible: alertVisible, message: alertMessage, hideAlert } = useAlertStore();
  
  // Confirmation modal store
  const { showConfirmation } = useConfirmationModalStore();
  
  const {
    users,
    loading,
    error,
    searchTerm,
    viewMode,
    activeTab,
    userStats,
    totalUsers,
    filteredCount,
    editingUser,
    userToDelete,
    showEditModal,
    showDeleteModal,
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
  } = useExternalUserManager();

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

  // Enhanced save user with success alert
  const handleSaveUserWithAlert = async () => {
    await handleSaveUser();
    
    // Show success alert after successful save
    if (editingUser) {
      const { showAlert } = useAlertStore.getState();
      showAlert(`External user "${editingUser.name}" updated successfully!`);
    }
  };

  // Enhanced delete user with confirmation and success alert
  const handleDeleteUserWithConfirmation = (user: any) => {
    showConfirmation({
      title: 'Delete External User',
      message: `Are you sure you want to delete "${user.name}"? This action cannot be undone and will permanently remove all their data, including their profile, video analysis history (${user.videosAnalyzed} videos), and all associated permissions.`,
      confirmText: 'Delete User',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: async () => {
        const userName = user.name;
        await handleConfirmDelete();
        
        // Show success alert after successful delete
        const { showAlert } = useAlertStore.getState();
        showAlert(`External user "${userName}" deleted successfully!`);
      }
    });
  };

  const handleExportUsers = () => {
    // Create CSV content
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Country', 'Status', 'Last Active', 'Videos Analyzed'];
    const csvContent = [
      headers.join(','),
      ...users.map(user => [
        user.id,
        `"${user.name}"`,
        user.email,
        user.phone,
        user.department, // This is now the country field
        user.status,
        user.lastActive,
        user.videosAnalyzed
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `external_users_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success alert for export
    const { showAlert } = useAlertStore.getState();
    showAlert(`External users data exported successfully!`);
  };

  if (loading && users.length === 0) {
    return <LoadingSpinner message="Loading external users..." />;
  }

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Page Alert - After Title */}
      <PageAlert
        isVisible={alertVisible}
        message={alertMessage}
        onClose={hideAlert}
      />

      {error && <ErrorDisplay error={error} onClose={clearError} />}

      <PageHeader
        title="Total External Users"
        subtitle={searchTerm ? `Showing ${filteredCount} of ${totalUsers} external users` : undefined}
        icon={UsersIcon}
        count={totalUsers}
        actionButton={{
          label: "Export Users",
          onClick: handleExportUsers,
          icon: Download
        }}
      />

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search external users by name, email, or ID..."
            className="flex-1"
          />
          
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>
      </div>

      <ExternalUserTabs
        activeTab={activeTab}
        userStats={userStats}
        onTabChange={setActiveTab}
        isRTL={isRTL}
        t={(key: string) => key}
      />

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedUsers.map(user => (
            <UserCard 
              key={user.id} 
              user={user}
              onView={handleViewUser}
              onEdit={handleEditUser}
              onDelete={handleDeleteUserWithConfirmation}
              showEditDelete={true}
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
          showEditDelete={true}
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
        <EmptyState
          icon={UsersIcon}
          title="No external users found"
          description={searchTerm ? 'Try adjusting your search criteria' : 'No external users available'}
          actionButton={searchTerm ? {
            label: "Clear Search",
            onClick: () => setSearchTerm('')
          } : undefined}
        />
      )}

      <ExternalUserProfileModal />
      
      <ExternalUserEditModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        user={editingUser}
        onSave={handleSaveUserWithAlert}
        onFieldChange={updateEditingUserField}
        loading={loading}
      />
    </div>
  );
};

export default ExternalUsersPage;