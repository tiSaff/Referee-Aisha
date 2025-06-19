import React, { useState, useEffect } from 'react';
import { X, Users as UsersIcon, Mail, Eye, EyeOff } from 'lucide-react';
import Button from '../common/Button';
import FormField from '../common/FormField';
import MultiSelectDropdown from '../common/MultiSelectDropdown';
import { useMultiSelectDropdownStore } from '../../store/multiSelectDropdownStore';

// Country options with flags - same as in ExternalUserEditModal
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

interface AddExternalUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (userData: any) => void;
  loading?: boolean;
}

const AddExternalUserModal: React.FC<AddExternalUserModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
  loading = false
}) => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
  });
  
  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    special: false
  });
  
  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Country dropdown state
  const countryDropdownId = 'add-user-country';
  const {
    getDropdownState,
    toggleDropdown,
    closeDropdown,
    setSearchTerm,
    setSelectedValues,
    resetDropdown
  } = useMultiSelectDropdownStore();

  const dropdownState = getDropdownState(countryDropdownId);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Validate password as user types
    if (name === 'password') {
      validatePassword(value);
    }
    
    // Check if passwords match
    if (name === 'confirmPassword' || (name === 'password' && formData.confirmPassword)) {
      if (name === 'password' && value !== formData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else if (name === 'confirmPassword' && value !== formData.password) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  // Validate password
  const validatePassword = (password: string) => {
    setPasswordValidation({
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    });
  };

  // Handle country selection
  const handleCountrySelect = (countryName: string) => {
    setFormData(prev => ({ ...prev, country: countryName }));
    setSelectedValues(countryDropdownId, [countryName]);
    closeDropdown(countryDropdownId);
    
    // Clear error when field is edited
    if (errors.country) {
      setErrors(prev => ({ ...prev, country: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (!formData.country) newErrors.country = 'Country is required';
    
    // Email format
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Password validation
    if (formData.password) {
      if (!passwordValidation.length) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!passwordValidation.lowercase) {
        newErrors.password = 'Password must contain at least one lowercase letter';
      } else if (!passwordValidation.uppercase) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } else if (!passwordValidation.special) {
        newErrors.password = 'Password must contain at least one special character';
      }
    }
    
    // Passwords match
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Split full name into first and last name
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      // Create user data object
      const userData = {
        firstName,
        lastName,
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        department: formData.country,
        status: 'active',
        password: formData.password // In a real app, this would be handled securely
      };
      
      onAddUser(userData);
    }
  };

  // Reset form when modal closes
  const handleClose = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      country: '',
    });
    setErrors({});
    resetDropdown(countryDropdownId);
    onClose();
  };

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (dropdownState.showDropdown) {
          closeDropdown(countryDropdownId);
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
          className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <UsersIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add External User</h2>
            </div>
            <Button variant="ghost" onClick={handleClose}>
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </Button>
          </div>

          {/* Modal Content */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
            {/* Full Name */}
            <FormField 
              label="Full Name" 
              required
              error={errors.fullName}
            >
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
              />
            </FormField>

            {/* Country */}
            <div>
              <MultiSelectDropdown
                label="Country"
                placeholder="Select Country"
                options={countryOptions}
                selectedValues={dropdownState.selectedValues}
                searchTerm={dropdownState.searchTerm}
                showDropdown={dropdownState.showDropdown}
                multiSelect={false}
                onToggleDropdown={() => toggleDropdown(countryDropdownId)}
                onSearchChange={(term) => setSearchTerm(countryDropdownId, term)}
                onOptionSelect={handleCountrySelect}
                onRemoveValue={() => {}}
                className={errors.country ? 'mb-1' : ''}
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country}</p>
              )}
            </div>

            {/* Phone */}
            <FormField 
              label="Phone" 
              required
              error={errors.phone}
            >
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                placeholder="Enter phone number"
              />
            </FormField>

            {/* Email */}
            <FormField 
              label="Email" 
              required
              error={errors.email}
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
              />
            </FormField>

            {/* Password */}
            <FormField 
              label="Password" 
              required
              error={errors.password}
            >
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password requirements */}
              <div className="mt-2 space-y-1">
                <p className="text-sm font-medium text-gray-700">Password must contain:</p>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${passwordValidation.length ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidation.length ? '✓' : '✗'} At least 8 characters
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${passwordValidation.lowercase ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidation.lowercase ? '✓' : '✗'} At least one lowercase letter (a-z)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${passwordValidation.uppercase ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidation.uppercase ? '✓' : '✗'} At least one uppercase letter (A-Z)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${passwordValidation.special ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidation.special ? '✓' : '✗'} At least one special character (!@#$%^&*_+)
                  </span>
                </div>
              </div>
            </FormField>

            {/* Confirm Password */}
            <FormField 
              label="Confirm Password" 
              required
              error={errors.confirmPassword}
            >
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </FormField>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <Button
                type="submit"
                loading={loading}
                className="w-full py-3 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: '#2a835f' }}
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExternalUserModal;