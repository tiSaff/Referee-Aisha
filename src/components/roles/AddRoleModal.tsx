import React, { useState, useEffect } from 'react';
import { X, Users } from 'lucide-react';
import Button from '../common/Button';
import FormField from '../common/FormField';

interface Permission {
  id: string;
  name: string;
  description: string;
  checked: boolean;
}

interface PermissionGroup {
  name: string;
  permissions: Permission[];
}

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRole: (roleData: any) => Promise<void>;
  loading?: boolean;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({
  isOpen,
  onClose,
  onAddRole,
  loading = false
}) => {
  // Form state
  const [formData, setFormData] = useState({
    nameArabic: '',
    nameEnglish: '',
    descriptionArabic: '',
    descriptionEnglish: '',
  });
  
  // Permissions state
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([
    {
      name: 'Today Board',
      permissions: [
        {
          id: 'viewTodayDashboard',
          name: "View Today's Dashboard",
          description: "Can view an overview of stadium readiness, status distribution, and match assignments",
          checked: false
        }
      ]
    },
    {
      name: 'Stadiums',
      permissions: [
        {
          id: 'viewAllStadiums',
          name: "View all stadiums",
          description: "Can view all stadiums registered on the platform",
          checked: false
        },
        {
          id: 'manageAllStadiums',
          name: "Manage all stadiums",
          description: "Can edit all stadiums registered on the platform and assign staff to them",
          checked: false
        }
      ]
    },
    {
      name: 'Matches',
      permissions: [
        {
          id: 'viewAllMatches',
          name: "View All Matches",
          description: "Can view all matches on the platform along with their assignments",
          checked: false
        },
        {
          id: 'viewUpcomingMatches',
          name: "View Upcoming Matches",
          description: "Can view the list and details of all upcoming matches",
          checked: false
        },
        {
          id: 'manageUpcomingMatches',
          name: "Manage Upcoming Matches",
          description: "Can assign employees to upcoming matches, approve or decline apologies, and upload or edit match forms",
          checked: false
        }
      ]
    },
    {
      name: 'Settings',
      permissions: [
        {
          id: 'manageSettings',
          name: "Manage settings",
          description: "Can create, view, edit, and delete platform settings",
          checked: false
        }
      ]
    },
    {
      name: 'Users',
      permissions: [
        {
          id: 'manageUsers',
          name: "Manage Users",
          description: "Can create, edit, and delete users",
          checked: false
        }
      ]
    },
    {
      name: 'Roles',
      permissions: [
        {
          id: 'manageRoles',
          name: "Manage Roles",
          description: "Can create, edit, and delete roles",
          checked: false
        }
      ]
    }
  ]);
  
  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle permission toggle
  const handlePermissionToggle = (groupIndex: number, permissionIndex: number) => {
    const updatedGroups = [...permissionGroups];
    const permission = updatedGroups[groupIndex].permissions[permissionIndex];
    permission.checked = !permission.checked;
    setPermissionGroups(updatedGroups);
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.nameEnglish.trim()) newErrors.nameEnglish = 'Role name in English is required';
    if (!formData.nameArabic.trim()) newErrors.nameArabic = 'Role name in Arabic is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Get selected permissions
      const selectedPermissions = permissionGroups.flatMap(group => 
        group.permissions.filter(p => p.checked).map(p => p.id)
      );
      
      // Create role data object
      const roleData = {
        ...formData,
        permissions: selectedPermissions
      };
      
      await onAddRole(roleData);
    }
  };

  // Reset form when modal closes
  const handleClose = () => {
    setFormData({
      nameArabic: '',
      nameEnglish: '',
      descriptionArabic: '',
      descriptionEnglish: '',
    });
    
    // Reset permissions
    const resetGroups = permissionGroups.map(group => ({
      ...group,
      permissions: group.permissions.map(p => ({ ...p, checked: false }))
    }));
    setPermissionGroups(resetGroups);
    
    setErrors({});
    onClose();
  };

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Users className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Role</h2>
            </div>
            <Button variant="ghost" onClick={handleClose}>
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </Button>
          </div>

          {/* Modal Content */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
            {/* Role Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <FormField 
                label="Role Name (Arabic)" 
                required
                error={errors.nameArabic}
              >
                <input
                  type="text"
                  name="nameArabic"
                  value={formData.nameArabic}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                  placeholder="Enter role name in Arabic"
                  dir="rtl"
                />
              </FormField>

              <FormField 
                label="Role Name (English)" 
                required
                error={errors.nameEnglish}
              >
                <input
                  type="text"
                  name="nameEnglish"
                  value={formData.nameEnglish}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                  placeholder="Enter role name in English"
                />
              </FormField>
            </div>

            {/* Role Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <FormField 
                label="Role Description (Arabic)"
                error={errors.descriptionArabic}
              >
                <textarea
                  name="descriptionArabic"
                  value={formData.descriptionArabic}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none h-32"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                  placeholder="Enter Role Description (Arabic)"
                  dir="rtl"
                />
              </FormField>

              <FormField 
                label="Role Description (English)"
                error={errors.descriptionEnglish}
              >
                <textarea
                  name="descriptionEnglish"
                  value={formData.descriptionEnglish}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none h-32"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                  placeholder="Enter Role Description in English"
                />
              </FormField>
            </div>

            {/* Permissions Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h3>
              
              <div className="space-y-6">
                {permissionGroups.map((group, groupIndex) => (
                  <div key={group.name} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">{group.name}</h4>
                    <div className="space-y-3">
                      {group.permissions.map((permission, permIndex) => (
                        <div 
                          key={permission.id}
                          className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1 pr-4">
                            <label className="text-sm font-medium text-gray-700 cursor-pointer">
                              {permission.name}
                            </label>
                            <p className="text-xs text-gray-500 mt-1">{permission.description}</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={permission.checked}
                            onChange={() => handlePermissionToggle(groupIndex, permIndex)}
                            className="rounded border-gray-300 focus:ring-2 transition-all duration-200 w-4 h-4"
                            style={{ 
                              '--tw-ring-color': '#2a835f',
                              accentColor: '#2a835f'
                            } as React.CSSProperties}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoleModal;