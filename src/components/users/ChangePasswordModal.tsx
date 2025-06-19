import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useChangePasswordModalStore } from '../../store/changePasswordModalStore';
import FormField from '../common/FormField';
import PasswordInput from '../common/PasswordInput';
import Button from '../common/Button';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  employeeId: number;
  phoneNumber: string;
  onSave: (newPassword: string) => void;
  loading?: boolean;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  email,
  employeeId,
  phoneNumber,
  onSave,
  loading = false
}) => {
  // Zustand store
  const {
    newPassword,
    confirmPassword,
    showNewPassword,
    showConfirmPassword,
    setNewPassword,
    setConfirmPassword,
    toggleShowNewPassword,
    toggleShowConfirmPassword,
    resetForm,
    getPasswordsMatch,
    getCanSubmit
  } = useChangePasswordModalStore();

  const passwordsMatch = getPasswordsMatch();
  const canSubmit = getCanSubmit();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
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
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      onSave(newPassword);
      resetForm();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Read-only User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Email" required>
              <input
                type="email"
                value={email}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                disabled
              />
            </FormField>

            <FormField label="Employee ID" required>
              <input
                type="text"
                value={employeeId}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                disabled
              />
            </FormField>

            <div className="md:col-span-2">
              <FormField label="Phone Number" required>
                <input
                  type="tel"
                  value={phoneNumber}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  disabled
                />
              </FormField>
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
            <FormField label="Password" required>
              <PasswordInput
                value={newPassword}
                onChange={setNewPassword}
                placeholder="Enter your new password"
                showPassword={showNewPassword}
                onToggleShow={toggleShowNewPassword}
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
                placeholder="Confirm your new password"
                showPassword={showConfirmPassword}
                onToggleShow={toggleShowConfirmPassword}
                required
              />
            </FormField>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!canSubmit || loading}
                loading={loading}
              >
                Save Password
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;