import React from 'react';
import { X, Users as UsersIcon, Mail } from 'lucide-react';
import { User } from '../../types';
import Button from '../common/Button';
import FormField from '../common/FormField';
import MultiSelectDropdown from '../common/MultiSelectDropdown';
import { useMultiSelectDropdownStore } from '../../store/multiSelectDropdownStore';

interface ExternalUserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: () => void;
  onFieldChange: (field: string, value: string | boolean) => void;
  loading?: boolean;
}

// Country options with flags
const countryOptions = [
  { value: 'Aruba', label: 'Aruba', flag: '🇦🇼' },
  { value: 'Afghanistan', label: 'Afghanistan', flag: '🇦🇫' },
  { value: 'Angola', label: 'Angola', flag: '🇦🇴' },
  { value: 'Anguilla', label: 'Anguilla', flag: '🇦🇮' },
  { value: 'Albania', label: 'Albania', flag: '🇦🇱' },
  { value: 'United Arab Emirates', label: 'United Arab Emirates', flag: '🇦🇪' },
  { value: 'Argentina', label: 'Argentina', flag: '🇦🇷' },
  { value: 'Armenia', label: 'Armenia', flag: '🇦🇲' },
  { value: 'Australia', label: 'Australia', flag: '🇦🇺' },
  { value: 'Austria', label: 'Austria', flag: '🇦🇹' },
  { value: 'Azerbaijan', label: 'Azerbaijan', flag: '🇦🇿' },
  { value: 'Belgium', label: 'Belgium', flag: '🇧🇪' },
  { value: 'Bangladesh', label: 'Bangladesh', flag: '🇧🇩' },
  { value: 'Bulgaria', label: 'Bulgaria', flag: '🇧🇬' },
  { value: 'Bahrain', label: 'Bahrain', flag: '🇧🇭' },
  { value: 'Brazil', label: 'Brazil', flag: '🇧🇷' },
  { value: 'Canada', label: 'Canada', flag: '🇨🇦' },
  { value: 'Switzerland', label: 'Switzerland', flag: '🇨🇭' },
  { value: 'Chile', label: 'Chile', flag: '🇨🇱' },
  { value: 'China', label: 'China', flag: '🇨🇳' },
  { value: 'Colombia', label: 'Colombia', flag: '🇨🇴' },
  { value: 'Czech Republic', label: 'Czech Republic', flag: '🇨🇿' },
  { value: 'Germany', label: 'Germany', flag: '🇩🇪' },
  { value: 'Denmark', label: 'Denmark', flag: '🇩🇰' },
  { value: 'Algeria', label: 'Algeria', flag: '🇩🇿' },
  { value: 'Ecuador', label: 'Ecuador', flag: '🇪🇨' },
  { value: 'Egypt', label: 'Egypt', flag: '🇪🇬' },
  { value: 'Spain', label: 'Spain', flag: '🇪🇸' },
  { value: 'Estonia', label: 'Estonia', flag: '🇪🇪' },
  { value: 'Ethiopia', label: 'Ethiopia', flag: '🇪🇹' },
  { value: 'Finland', label: 'Finland', flag: '🇫🇮' },
  { value: 'France', label: 'France', flag: '🇫🇷' },
  { value: 'United Kingdom', label: 'United Kingdom', flag: '🇬🇧' },
  { value: 'Georgia', label: 'Georgia', flag: '🇬🇪' },
  { value: 'Ghana', label: 'Ghana', flag: '🇬🇭' },
  { value: 'Greece', label: 'Greece', flag: '🇬🇷' },
  { value: 'Hong Kong', label: 'Hong Kong', flag: '🇭🇰' },
  { value: 'Croatia', label: 'Croatia', flag: '🇭🇷' },
  { value: 'Hungary', label: 'Hungary', flag: '🇭🇺' },
  { value: 'Indonesia', label: 'Indonesia', flag: '🇮🇩' },
  { value: 'Ireland', label: 'Ireland', flag: '🇮🇪' },
  { value: 'Israel', label: 'Israel', flag: '🇮🇱' },
  { value: 'India', label: 'India', flag: '🇮🇳' },
  { value: 'Iraq', label: 'Iraq', flag: '🇮🇶' },
  { value: 'Iran', label: 'Iran', flag: '🇮🇷' },
  { value: 'Iceland', label: 'Iceland', flag: '🇮🇸' },
  { value: 'Italy', label: 'Italy', flag: '🇮🇹' },
  { value: 'Jamaica', label: 'Jamaica', flag: '🇯🇲' },
  { value: 'Jordan', label: 'Jordan', flag: '🇯🇴' },
  { value: 'Japan', label: 'Japan', flag: '🇯🇵' },
  { value: 'Kenya', label: 'Kenya', flag: '🇰🇪' },
  { value: 'South Korea', label: 'South Korea', flag: '🇰🇷' },
  { value: 'Kuwait', label: 'Kuwait', flag: '🇰🇼' },
  { value: 'Lebanon', label: 'Lebanon', flag: '🇱🇧' },
  { value: 'Sri Lanka', label: 'Sri Lanka', flag: '🇱🇰' },
  { value: 'Lithuania', label: 'Lithuania', flag: '🇱🇹' },
  { value: 'Luxembourg', label: 'Luxembourg', flag: '🇱🇺' },
  { value: 'Latvia', label: 'Latvia', flag: '🇱🇻' },
  { value: 'Morocco', label: 'Morocco', flag: '🇲🇦' },
  { value: 'Moldova', label: 'Moldova', flag: '🇲🇩' },
  { value: 'Madagascar', label: 'Madagascar', flag: '🇲🇬' },
  { value: 'North Macedonia', label: 'North Macedonia', flag: '🇲🇰' },
  { value: 'Mali', label: 'Mali', flag: '🇲🇱' },
  { value: 'Myanmar', label: 'Myanmar', flag: '🇲🇲' },
  { value: 'Mongolia', label: 'Mongolia', flag: '🇲🇳' },
  { value: 'Mauritius', label: 'Mauritius', flag: '🇲🇺' },
  { value: 'Malawi', label: 'Malawi', flag: '🇲🇼' },
  { value: 'Mexico', label: 'Mexico', flag: '🇲🇽' },
  { value: 'Malaysia', label: 'Malaysia', flag: '🇲🇾' },
  { value: 'Mozambique', label: 'Mozambique', flag: '🇲🇿' },
  { value: 'Namibia', label: 'Namibia', flag: '🇳🇦' },
  { value: 'Nigeria', label: 'Nigeria', flag: '🇳🇬' },
  { value: 'Nicaragua', label: 'Nicaragua', flag: '🇳🇮' },
  { value: 'Netherlands', label: 'Netherlands', flag: '🇳🇱' },
  { value: 'Norway', label: 'Norway', flag: '🇳🇴' },
  { value: 'Nepal', label: 'Nepal', flag: '🇳🇵' },
  { value: 'New Zealand', label: 'New Zealand', flag: '🇳🇿' },
  { value: 'Oman', label: 'Oman', flag: '🇴🇲' },
  { value: 'Pakistan', label: 'Pakistan', flag: '🇵🇰' },
  { value: 'Panama', label: 'Panama', flag: '🇵🇦' },
  { value: 'Peru', label: 'Peru', flag: '🇵🇪' },
  { value: 'Philippines', label: 'Philippines', flag: '🇵🇭' },
  { value: 'Poland', label: 'Poland', flag: '🇵🇱' },
  { value: 'Portugal', label: 'Portugal', flag: '🇵🇹' },
  { value: 'Paraguay', label: 'Paraguay', flag: '🇵🇾' },
  { value: 'Qatar', label: 'Qatar', flag: '🇶🇦' },
  { value: 'Romania', label: 'Romania', flag: '🇷🇴' },
  { value: 'Russia', label: 'Russia', flag: '🇷🇺' },
  { value: 'Rwanda', label: 'Rwanda', flag: '🇷🇼' },
  { value: 'Saudi Arabia', label: 'Saudi Arabia', flag: '🇸🇦' },
  { value: 'Sudan', label: 'Sudan', flag: '🇸🇩' },
  { value: 'Senegal', label: 'Senegal', flag: '🇸🇳' },
  { value: 'Singapore', label: 'Singapore', flag: '🇸🇬' },
  { value: 'Sierra Leone', label: 'Sierra Leone', flag: '🇸🇱' },
  { value: 'El Salvador', label: 'El Salvador', flag: '🇸🇻' },
  { value: 'Somalia', label: 'Somalia', flag: '🇸🇴' },
  { value: 'Serbia', label: 'Serbia', flag: '🇷🇸' },
  { value: 'Slovakia', label: 'Slovakia', flag: '🇸🇰' },
  { value: 'Slovenia', label: 'Slovenia', flag: '🇸🇮' },
  { value: 'Sweden', label: 'Sweden', flag: '🇸🇪' },
  { value: 'Syria', label: 'Syria', flag: '🇸🇾' },
  { value: 'Chad', label: 'Chad', flag: '🇹🇩' },
  { value: 'Togo', label: 'Togo', flag: '🇹🇬' },
  { value: 'Thailand', label: 'Thailand', flag: '🇹🇭' },
  { value: 'Tunisia', label: 'Tunisia', flag: '🇹🇳' },
  { value: 'Turkey', label: 'Turkey', flag: '🇹🇷' },
  { value: 'Taiwan', label: 'Taiwan', flag: '🇹🇼' },
  { value: 'Tanzania', label: 'Tanzania', flag: '🇹🇿' },
  { value: 'Uganda', label: 'Uganda', flag: '🇺🇬' },
  { value: 'Ukraine', label: 'Ukraine', flag: '🇺🇦' },
  { value: 'Uruguay', label: 'Uruguay', flag: '🇺🇾' },
  { value: 'United States', label: 'United States', flag: '🇺🇸' },
  { value: 'Uzbekistan', label: 'Uzbekistan', flag: '🇺🇿' },
  { value: 'Venezuela', label: 'Venezuela', flag: '🇻🇪' },
  { value: 'Vietnam', label: 'Vietnam', flag: '🇻🇳' },
  { value: 'Yemen', label: 'Yemen', flag: '🇾🇪' },
  { value: 'South Africa', label: 'South Africa', flag: '🇿🇦' },
  { value: 'Zambia', label: 'Zambia', flag: '🇿🇲' },
  { value: 'Zimbabwe', label: 'Zimbabwe', flag: '🇿🇼' },
];

const ExternalUserEditModal: React.FC<ExternalUserEditModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
  onFieldChange,
  loading = false
}) => {
  const dropdownId = 'external-user-country';
  const {
    getDropdownState,
    toggleDropdown,
    closeDropdown,
    setSearchTerm,
    setSelectedValues,
    resetDropdown
  } = useMultiSelectDropdownStore();

  const dropdownState = getDropdownState(dropdownId);

  // Initialize dropdown with user's current country
  React.useEffect(() => {
    if (isOpen && user?.department) {
      setSelectedValues(dropdownId, [user.department]);
    }
  }, [isOpen, user?.department, setSelectedValues]);

  // Handle send reset password email
  const handleSendResetPasswordEmail = () => {
    if (user?.email) {
      console.log('Sending reset password email to:', user.email);
      alert(`Reset password email sent to ${user.email}`);
    }
  };

  // Handle modal close with cleanup
  const handleClose = () => {
    onClose();
    resetDropdown(dropdownId);
  };

  // Handle country selection
  const handleCountrySelect = (countryName: string) => {
    onFieldChange('department', countryName);
    setSelectedValues(dropdownId, [countryName]);
    closeDropdown(dropdownId);
  };

  // Handle escape key
  React.useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (dropdownState.showDropdown) {
          closeDropdown(dropdownId);
        } else {
          handleClose();
        }
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
  }, [isOpen, dropdownState.showDropdown, closeDropdown]);

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Enhanced Backdrop */}
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
                <UsersIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit External User</h2>
            </div>
            <Button variant="ghost" onClick={handleClose}>
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </Button>
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <FormField label="First Name" required>
                <input
                  type="text"
                  value={user.firstName}
                  onChange={(e) => onFieldChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                />
              </FormField>

              <FormField label="Last Name" required>
                <input
                  type="text"
                  value={user.lastName}
                  onChange={(e) => onFieldChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                />
              </FormField>

              <FormField label="Email" required>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => onFieldChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                />
              </FormField>

              <FormField label="User ID" required>
                <input
                  type="text"
                  value={user.id.toString()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-sm sm:text-base"
                  disabled
                />
              </FormField>

              <FormField label="Phone Number" required>
                <input
                  type="tel"
                  value={user.phone}
                  onChange={(e) => onFieldChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                />
              </FormField>

              <div>
                <MultiSelectDropdown
                  label="Country"
                  placeholder="Select Country"
                  options={countryOptions}
                  selectedValues={dropdownState.selectedValues}
                  searchTerm={dropdownState.searchTerm}
                  showDropdown={dropdownState.showDropdown}
                  multiSelect={false}
                  onToggleDropdown={() => toggleDropdown(dropdownId)}
                  onSearchChange={(term) => setSearchTerm(dropdownId, term)}
                  onOptionSelect={handleCountrySelect}
                  onRemoveValue={() => {}}
                />
              </div>

              <FormField label="Status">
                <select
                  value={user.status}
                  onChange={(e) => onFieldChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </FormField>
            </div>

            {/* Send Reset Password Email Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Password Reset</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Send a password reset email to the user's email address: <strong>{user.email}</strong>
                    </p>
                    <button
                      type="button"
                      onClick={handleSendResetPasswordEmail}
                      disabled={loading}
                      className="inline-flex items-center px-4 py-2 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ 
                        backgroundColor: '#2a835f',
                        '--tw-ring-color': '#2a835f'
                      } as React.CSSProperties}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Reset Password Email
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center sm:justify-end pt-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  disabled={loading}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  onClick={onSave}
                  loading={loading}
                  className="w-full sm:w-auto"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalUserEditModal;