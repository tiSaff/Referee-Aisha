import React, { useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { User } from '../../types';
import Button from '../common/Button';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onConfirm: () => void;
  loading?: boolean;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onConfirm,
  loading = false
}) => {
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

  if (!isOpen || !user) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-4 sm:w-5 h-4 sm:h-5 text-red-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Delete User</h2>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-4 sm:w-5 h-4 sm:h-5" />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6">
          <div className="mb-6">
            <p className="text-gray-700 mb-4 text-sm sm:text-base">
              Are you sure you want to delete <strong>{user.name}</strong>? This action cannot be undone.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-4 sm:w-5 h-4 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-800 mb-1">Warning</h4>
                  <p className="text-xs sm:text-sm text-red-700">
                    Deleting this user will permanently remove all their data, including:
                  </p>
                  <ul className="text-xs sm:text-sm text-red-700 mt-2 list-disc list-inside space-y-1">
                    <li>User profile and account information</li>
                    <li>Video analysis history ({user.videosAnalyzed} videos)</li>
                    <li>All associated permissions and settings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={onConfirm}
              loading={loading}
              className="w-full sm:w-auto"
            >
              Delete User
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;