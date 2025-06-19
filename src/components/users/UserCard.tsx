import React from 'react';
import { Users as UsersIcon, Eye, Edit, Trash2, Mail, MapPin } from 'lucide-react';
import { User } from '../../types';

interface UserCardProps {
  user: User;
  onView: (user: User) => void;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  showEditDelete?: boolean;
  loading?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onView, 
  onEdit, 
  onDelete, 
  showEditDelete = true,
  loading = false
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <UsersIcon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-500" />
          </div>
        </div>
        
        {/* Status Badge */}
        <div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            user.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : user.status === 'inactive'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
          }`}>
            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          {/* Fixed name with ellipsis - single line */}
          <h3 
            className="font-semibold text-gray-900 text-base sm:text-lg leading-tight truncate"
            title={user.name} // Show full name on hover
          >
            {user.name}
          </h3>
          <p className="text-xs text-gray-500">ID: {user.id}</p>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Mail className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
            <span className="truncate">{user.location || 'Not specified'}</span>
          </div>
        </div>

        {/* Single Line Action Buttons */}
        <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
          {/* View Button - Menu color (#2a835f) */}
          <button 
            onClick={() => onView(user)}
            disabled={loading}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 text-white text-sm font-medium rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: '#2a835f',
              '--tw-ring-color': '#2a835f'
            } as React.CSSProperties}
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
          
          {/* Edit and Delete Buttons - Side by Side */}
          {showEditDelete && (
            <>
              {onEdit && (
                <button 
                  onClick={() => onEdit(user)}
                  disabled={loading}
                  className="flex items-center justify-center space-x-1.5 px-3 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              )}
              
              {onDelete && (
                <button 
                  onClick={() => onDelete(user)}
                  disabled={loading}
                  className="flex items-center justify-center px-3 py-2.5 bg-white text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;