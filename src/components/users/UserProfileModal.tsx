import React, { useEffect } from 'react';
import { X, Users as UsersIcon, Phone, Mail } from 'lucide-react';
import { User } from '../../types';
import Button from '../common/Button';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user
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
      className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Profile</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-4 sm:w-5 h-4 sm:h-5" />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <UsersIcon className="w-8 sm:w-10 h-8 sm:h-10 text-gray-500" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-4 text-center sm:text-left">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{user.name}</h3>
                <p className="text-sm sm:text-base text-gray-600">Employee ID: {user.id}</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number:
                      </label>
                      <div className="flex items-center justify-center sm:justify-start space-x-2">
                        <Phone className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                        <a 
                          href={`tel:${user.phone}`}
                          className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors text-sm sm:text-base"
                        >
                          {user.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email:
                      </label>
                      <div className="flex items-center justify-center sm:justify-start space-x-2">
                        <Mail className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                        <a 
                          href={`mailto:${user.email}`}
                          className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors text-sm sm:text-base truncate"
                        >
                          {user.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;