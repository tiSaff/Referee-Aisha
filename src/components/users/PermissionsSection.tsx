import React from 'react';
import { User } from '../../types';
import Checkbox from '../common/Checkbox';

interface PermissionsSectionProps {
  user: User;
  onPermissionChange: (field: string, value: boolean) => void;
}

const PermissionsSection: React.FC<PermissionsSectionProps> = ({
  user,
  onPermissionChange
}) => {
  const permissionGroups = [
    {
      title: "Video Management",
      permissions: [
        { key: 'videoPendingPermission', label: 'Video Pending Permission', description: 'Access to pending videos' },
        { key: 'videoUnderReviewPermission', label: 'Video Under Review Permission', description: 'Access to videos under review' },
        { key: 'videoAcceptedPermission', label: 'Video Accepted Permission', description: 'Access to accepted videos' },
        { key: 'uploadVideoPermission', label: 'Upload Video Permission', description: 'Ability to upload new videos' }
      ]
    },
    {
      title: "Settings & Configuration",
      permissions: [
        { key: 'settingsAddConsiderationsPermission', label: 'Add Considerations Permission', description: 'Ability to add considerations in settings' },
        { key: 'settingsAddTopicPermission', label: 'Add Topic Permission', description: 'Ability to add new topics' }
      ]
    },
    {
      title: "Communication & User Management",
      permissions: [
        { key: 'addNotification', label: 'Add Notification', description: 'Ability to send notifications' },
        { key: 'viewUsersExternal', label: 'View External Users', description: 'Access to external users section' },
        { key: 'accountResponsibleForAddingUsers', label: 'Responsible for Adding Users', description: 'Authority to add new users to the system' }
      ]
    },
    {
      title: "Account Status",
      permissions: [
        { key: 'accountIsActive', label: 'Account is Active', description: 'Enable or disable user account access' }
      ]
    }
  ];

  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">Permissions</h3>
        <h3 className="text-base sm:text-lg font-medium text-gray-900">Access</h3>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {permissionGroups.map((group) => (
          <div key={group.title} className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-4 text-sm sm:text-base">{group.title}</h4>
            <div className="space-y-3">
              {group.permissions.map((permission) => (
                <Checkbox
                  key={permission.key}
                  checked={user.permissions[permission.key as keyof typeof user.permissions]}
                  onChange={(checked) => onPermissionChange(`permissions.${permission.key}`, checked)}
                  label={permission.label}
                  description={permission.description}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Google Authentication Reset */}
        <div className="mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-700">
            Can't access your account?{' '}
            <button className="text-blue-600 hover:text-blue-800 underline">
              Reset your Google authentication
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default PermissionsSection;