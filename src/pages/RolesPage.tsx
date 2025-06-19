import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Check } from 'lucide-react';
import Button from '../components/common/Button';
import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';
import PageAlert from '../components/common/PageAlert';
import { useAlertStore } from '../store/alertStore';
import { useConfirmationModalStore } from '../store/confirmationModalStore';
import AddRoleModal from '../components/roles/AddRoleModal';
import RolesTable from '../components/roles/RolesTable';
import { useRolesManager } from '../hooks/useRolesManager';

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
  } = useRolesManager();

  // Alert store for success messages
  const { isVisible: alertVisible, message: alertMessage, hideAlert } = useAlertStore();
  
  // Confirmation modal store
  const { showConfirmation } = useConfirmationModalStore();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Calculate pagination
  const indexOfLastRole = currentPage * itemsPerPage;
  const indexOfFirstRole = indexOfLastRole - itemsPerPage;
  const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);
  const totalPages = Math.ceil(roles.length / itemsPerPage);

  // Enhanced delete role with confirmation
  const handleDeleteRoleWithConfirmation = (roleId: string, roleName: string) => {
    showConfirmation({
      title: 'Delete Role',
      message: `Are you sure you want to delete the role "${roleName}"? This action cannot be undone and may affect users assigned to this role.`,
      confirmText: 'Delete Role',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: () => {
        handleDeleteRole(roleId);
      }
    });
  };

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Page Alert */}
      <PageAlert
        isVisible={alertVisible}
        message={alertMessage}
        onClose={hideAlert}
      />

      {/* Page Header */}
      <PageHeader
        title="Roles"
        subtitle="Manage user roles and permissions"
        icon={Plus}
        actionButton={{
          label: "Add New Role",
          onClick: handleAddRole,
          icon: Plus
        }}
      />

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search roles by name or description..."
            className="flex-1"
          />
        </div>
      </div>

      {/* Roles Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <RolesTable 
          roles={currentRoles}
          onEdit={handleEditRole}
          onDelete={handleDeleteRoleWithConfirmation}
          loading={loading}
        />
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.max(1, totalPages)}
          totalItems={roles.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Add Role Modal */}
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