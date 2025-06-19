import React from 'react';
import { Users as UsersIcon, Phone, Mail, MapPin, Calendar, Activity, Globe } from 'lucide-react';
import { useExternalUserManager } from '../../hooks/useExternalUserManager';
import { useUIStore } from '../../store/uiStore';
import Modal from '../common/Modal';

const ExternalUserProfileModal: React.FC = () => {
  const { selectedUser } = useExternalUserManager();
  const { showExternalUserProfileModal, setModalState } = useUIStore();

  const handleClose = () => {
    setModalState('showExternalUserProfileModal', false);
  };

  if (!selectedUser) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal
      isOpen={showExternalUserProfileModal}
      onClose={handleClose}
      title="External User Profile"
      size="2xl"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <UsersIcon className="w-10 h-10 text-gray-500" />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h3>
              <p className="text-gray-600">External User ID: {selectedUser.id}</p>
              <div className="mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedUser.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a 
                    href={`mailto:${selectedUser.email}`}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
                  >
                    {selectedUser.email}
                  </a>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a 
                    href={`tel:${selectedUser.phone}`}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
                  >
                    {selectedUser.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{selectedUser.location || 'Not specified'}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{selectedUser.department}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Information */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Activity Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Videos Analyzed</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{selectedUser.videosAnalyzed}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Join Date</span>
              </div>
              <p className="text-sm text-gray-900">{formatDate(selectedUser.joinDate)}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Last Active</span>
              </div>
              <p className="text-sm text-gray-900">{formatDateTime(selectedUser.lastActive)}</p>
            </div>
          </div>
        </div>

        {/* Permissions Summary */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Access Permissions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'videoPendingPermission', label: 'Video Pending Access' },
              { key: 'videoAcceptedPermission', label: 'Video Accepted Access' },
              { key: 'uploadVideoPermission', label: 'Upload Video' },
              { key: 'accountIsActive', label: 'Account Active' }
            ].map((permission) => (
              <div key={permission.key} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{permission.label}</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  selectedUser.permissions[permission.key as keyof typeof selectedUser.permissions]
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedUser.permissions[permission.key as keyof typeof selectedUser.permissions] ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ExternalUserProfileModal;