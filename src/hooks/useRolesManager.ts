import { useState, useEffect } from 'react';
import { useAlertStore } from '../store/alertStore';

// Role type definition
interface Role {
  id: string;
  nameEnglish: string;
  nameArabic: string;
  descriptionEnglish: string;
  descriptionArabic: string;
  usersCount: number;
  permissions: string[];
}

export const useRolesManager = () => {
  // State
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      nameEnglish: 'Super Admin',
      nameArabic: 'مشرف عام',
      descriptionEnglish: 'Full access to all features and settings',
      descriptionArabic: 'وصول كامل إلى جميع الميزات والإعدادات',
      usersCount: 5,
      permissions: ['viewTodayDashboard', 'viewAllStadiums', 'manageAllStadiums', 'viewAllMatches', 'viewUpcomingMatches', 'manageUpcomingMatches', 'manageSettings', 'manageUsers', 'manageRoles']
    },
    {
      id: '2',
      nameEnglish: 'Admin',
      nameArabic: 'مشرف',
      descriptionEnglish: 'Access to most features except user and role management',
      descriptionArabic: 'الوصول إلى معظم الميزات باستثناء إدارة المستخدمين والأدوار',
      usersCount: 12,
      permissions: ['viewTodayDashboard', 'viewAllStadiums', 'manageAllStadiums', 'viewAllMatches', 'viewUpcomingMatches', 'manageUpcomingMatches', 'manageSettings']
    },
    {
      id: '3',
      nameEnglish: 'Stadium Manager',
      nameArabic: 'مدير الملعب',
      descriptionEnglish: 'Can manage stadiums and view matches',
      descriptionArabic: 'يمكنه إدارة الملاعب وعرض المباريات',
      usersCount: 28,
      permissions: ['viewTodayDashboard', 'viewAllStadiums', 'manageAllStadiums', 'viewAllMatches', 'viewUpcomingMatches']
    },
    {
      id: '4',
      nameEnglish: 'Match Coordinator',
      nameArabic: 'منسق المباراة',
      descriptionEnglish: 'Can view and manage upcoming matches',
      descriptionArabic: 'يمكنه عرض وإدارة المباريات القادمة',
      usersCount: 34,
      permissions: ['viewTodayDashboard', 'viewAllStadiums', 'viewAllMatches', 'viewUpcomingMatches', 'manageUpcomingMatches']
    },
    {
      id: '5',
      nameEnglish: 'Viewer',
      nameArabic: 'مشاهد',
      descriptionEnglish: 'Read-only access to stadiums and matches',
      descriptionArabic: 'وصول للقراءة فقط إلى الملاعب والمباريات',
      usersCount: 56,
      permissions: ['viewTodayDashboard', 'viewAllStadiums', 'viewAllMatches', 'viewUpcomingMatches']
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  // Alert store for success messages
  const { showAlert } = useAlertStore();

  // Filter roles based on search term
  const getFilteredRoles = () => {
    if (!searchTerm.trim()) {
      return roles;
    }
    
    const lowerSearchTerm = searchTerm.toLowerCase().trim();
    
    return roles.filter(role => {
      return role.nameEnglish.toLowerCase().includes(lowerSearchTerm) ||
             role.nameArabic.includes(lowerSearchTerm) ||
             (role.descriptionEnglish && role.descriptionEnglish.toLowerCase().includes(lowerSearchTerm)) ||
             (role.descriptionArabic && role.descriptionArabic.includes(lowerSearchTerm));
    });
  };

  const filteredRoles = getFilteredRoles();

  // Handlers
  const handleAddRole = () => {
    setShowAddModal(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    // In a real implementation, you would open an edit modal here
    console.log('Edit role:', role);
  };

  const handleDeleteRole = async (id: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove role from state
      setRoles(prevRoles => prevRoles.filter(role => role.id !== id));
      
      // Show success message
      showAlert('Role deleted successfully');
    } catch (err) {
      setError('Failed to delete role');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRole = async (roleData: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new role
      const newRole: Role = {
        id: Date.now().toString(),
        nameEnglish: roleData.nameEnglish,
        nameArabic: roleData.nameArabic,
        descriptionEnglish: roleData.descriptionEnglish,
        descriptionArabic: roleData.descriptionArabic,
        usersCount: 0, // New role has no users yet
        permissions: roleData.permissions
      };
      
      // Add to state
      setRoles(prevRoles => [...prevRoles, newRole]);
      
      // Close modal
      setShowAddModal(false);
      
      // Show success message
      showAlert(`Role "${newRole.nameEnglish}" created successfully`);
    } catch (err) {
      setError('Failed to create role');
    } finally {
      setLoading(false);
    }
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    roles: filteredRoles,
    allRoles: roles,
    loading,
    error,
    searchTerm,
    showAddModal,
    editingRole,
    totalRoles: roles.length,
    filteredCount: filteredRoles.length,
    
    // Actions
    handleAddRole,
    handleEditRole,
    handleDeleteRole,
    handleCreateRole,
    closeAddModal,
    setSearchTerm,
    clearError,
  };
};