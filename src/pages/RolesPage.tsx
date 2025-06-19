import React, { useState, useEffect } from 'react';
import { UserCog, Plus, Search, Download, RefreshCw } from 'lucide-react';
import { useRolesManager } from '../hooks/useRolesManager';
import { useAlertStore } from '../store/alertStore';
import { useConfirmationModalStore } from '../store/confirmationModalStore';
import { usePagination } from '../hooks/usePagination';
import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';
import ErrorDisplay from '../components/common/ErrorDisplay';
import LoadingSpinner from '../components/common/LoadingSpinner';
import RolesTable from '../components/roles/RolesTable';
import AddRoleModal from '../components/roles/AddRoleModal';
import Pagination from '../components/common/Pagination';
import PageAlert from '../components/common/PageAlert';

const RolesPage: React.FC = () => {
  const {
    roles,
    loading,
    error,
    searchTerm,
    showAddModal,
    totalRoles,
    filteredCount,
    handleAddRole,
    handleEditRole,
    handleDeleteRole,
    handleCreateRole,
    closeAddModal,
    setSearchTerm,
    clearError,
    refreshRoles,
    exportRoles,
  } = useRolesManager();

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
    paginatedData: paginatedRoles,
    goToPage
  } = usePagination({
    data: roles,
    itemsPerPage: 10,
    initialPage: 1
  });

  // Enhanced delete role with confirmation
  const handleDeleteRoleWithConfirmation = (roleId: string, roleName: string) => {
    showConfirmation({
      title: 'Delete Role',
      message: `Are you sure you want to delete the role "${roleName}"? This action cannot be undone and may affect users assigned to this role.`,
      confirmText: 'Delete Role',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: async () => {
        await handleDeleteRole(roleId);
        
        // Success alert is handled in the manager
      }
    });
  };

  // Enhanced refresh with success alert
  const handleRefreshWithAlert = async () => {
    await refreshRoles();
    const { showAlert } = useAlertStore.getState();
    showAlert('Roles refreshed successfully!');
  };

  // Enhanced export with success alert
  const handleExportWithAlert = () => {
    exportRoles();
    const { showAlert } = useAlertStore.getState();
    showAlert('Roles data exported successfully!');
  };

  if (loading && roles.length === 0) {
    return <LoadingSpinner message="Loading roles..." />;
  }

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Page Alert */}
      <PageAlert
        isVisible={alertVisible}
        message={alertMessage}
        onClose={hideAlert}
      />

      {error && <ErrorDisplay error={error} onClose={clearError} />}

      <PageHeader
        title="Roles Management"
        subtitle="Manage user roles and permissions"
        icon={UserCog}
        count={totalRoles}
        actionButton={{
          label: "Add New Role",
          onClick: handleAddRole,
          icon: Plus
        }}
      />

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search roles by name or description..."
            className="flex-1"
          />
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={handleRefreshWithAlert}>
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" onClick={handleExportWithAlert}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {roles.length > 0 ? (
        <>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <RolesTable 
              roles={paginatedRoles}
              onEdit={handleEditRole}
              onDelete={handleDeleteRoleWithConfirmation}
              loading={loading}
            />
          </div>
          
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
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <UserCog className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No roles found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? 'Try adjusting your search criteria' : 'Get started by creating your first role'}
          </p>
          {searchTerm ? (
            <Button onClick={() => setSearchTerm('')}>Clear Search</Button>
          ) : (
            <Button onClick={handleAddRole}>Add New Role</Button>
          )}
        </div>
      )}

      <AddRoleModal
        isOpen={showAddModal}
        onClose={closeAddModal}
        onAddRole={handleCreateRole}
        loading={loading}
      />
    </div>
  );
};

export default RolesPage;