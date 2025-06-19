import React, { useEffect } from 'react';
import { X, Users as UsersIcon } from 'lucide-react';
import { User } from '../../types';
import Button from '../common/Button';
import FormField from '../common/FormField';
import PermissionsSection from './PermissionsSection';
import ImageUpload from './ImageUpload';
import PasswordInput from '../common/PasswordInput';
import { useAddUserModalStore } from '../../store/addUserModalStore';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  loading?: boolean;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  loading = false
}) => {
  // Zustand store for local state
  const {
    newUser,
    selectedImage,
    imagePreview,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    passwordsMatch,
    canSubmit,
    setSelectedImage,
    setImagePreview,
    setPassword,
    setConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    updateUserField,
    resetForm,
    resetImageUpload
  } = useAddUserModalStore();

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

  // Handle modal close with cleanup
  const handleClose = () => {
    onClose();
    resetForm();
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      onSave();
    }
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
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add User</h2>
            </div>
            <Button variant="ghost" onClick={handleClose}>
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </Button>
          </div>

          {/* Modal Content */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
            {/* Upload Personal Image */}
            <ImageUpload
              selectedImage={selectedImage}
              imagePreview={imagePreview}
              onImageSelect={handleImageSelect}
              onRemoveImage={removeImage}
              label="Upload Personal Image"
              description="Allowed extensions: jpg, jpeg, gif, png"
            />

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <FormField label="First Name" required>
                <input
                  type="text"
                  value={newUser.firstName}
                  onChange={(e) => updateUserField('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                  required
                />
              </FormField>

              <FormField label="Last Name" required>
                <input
                  type="text"
                  value={newUser.lastName}
                  onChange={(e) => updateUserField('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                  required
                />
              </FormField>

              <FormField label="Email" required>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => updateUserField('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                  required
                />
              </FormField>

              <FormField label="Phone Number" required>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => updateUserField('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                  required
                />
              </FormField>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <FormField label="Password" required>
                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  placeholder="Enter password"
                  showPassword={showPassword}
                  onToggleShow={toggleShowPassword}
                  required
                />
              </FormField>

              <FormField 
                label="Confirm Password" 
                required
                error={confirmPassword && !passwordsMatch ? "Passwords do not match" : undefined}
              >
                <PasswordInput
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  placeholder="Confirm password"
                  showPassword={showConfirmPassword}
                  onToggleShow={toggleShowConfirmPassword}
                  required
                />
              </FormField>
            </div>

            {/* Permissions Section */}
            <PermissionsSection
              user={newUser}
              onPermissionChange={updateUserField}
            />

            {/* Add Button */}
            <div className="flex justify-center pt-6 border-t border-gray-200">
              <Button
                type="submit"
                disabled={!canSubmit || loading}
                loading={loading}
                size="lg"
                className="px-12"
              >
                Add
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;